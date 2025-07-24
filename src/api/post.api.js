import { endOfDay, formatISO } from "date-fns";
import supabase from "../supabase_client/create_client";

/**
 * Fetches posts up to the end of the given date.
 * @param {Object} params
 * @param {Date} params.date - The date to fetch posts up to.
 * @returns {Promise<Array>} - Array of post objects.
 * @throws {Error} - Throws if date is missing or fetch fails.
 */
export async function fetchPosts({ date }) {
  try {
    if (!date) {
      throw new Error("Missing required parameter: date");
    }

    const formattedDate = formatISO(endOfDay(date));

    const { data, error } = await supabase
      .from("post")
      .select("*, user (id, name, user_name)")
      // .gte("created_at", formatISO(startOfDay(date))) // Uncomment if needed
      .lte("created_at", formattedDate)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error (fetchPosts):", error.message);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (err) {
    console.error("fetchPosts failed:", err);
    throw err;
  }
}

/**
 * Fetches posts with pagination support.
 * @param {Object} params
 * @param {string} [params.pageParam] - Cursor for pagination (created_at value).
 * @returns {Promise<{data: Array, nextCursor: string|undefined, hasMore: boolean}>}
 * @throws {Error} - Throws if fetch fails.
 */
export async function fetchPostsPagination({ pageParam }) {
  const limit = 10;

  try {
    let query = supabase
      .from("post")
      .select("*, user (id, name, user_name)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (pageParam) {
      query = query.lt("created_at", pageParam);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    const nextCursor =
      data.length === limit ? data[data.length - 1].created_at : undefined;

    return {
      data,
      nextCursor,
      hasMore: !!nextCursor,
    };
  } catch (err) {
    console.log("🚀 ~ fetchPostsPagination ~ err:", err);
    throw err;
  }
}

/**
 * Fetches posts by user ID within a date range and optional search string.
 * @param {Object} params
 * @param {string} params.id - User ID.
 * @param {string} params.from - Start date (ISO string).
 * @param {string} params.to - End date (ISO string).
 * @param {string} [params.search] - Search string for post content.
 * @returns {Promise<Array>} - Array of post objects.
 * @throws {Error} - Throws if required params are missing or fetch fails.
 */
export async function fetchPostsById({ id, from, to, search = "" }) {
  try {
    if (!id || !from || !to) {
      throw new Error("Missing required parameters: id, from, or to");
    }

    const { data, error } = await supabase
      .from("post")
      .select("*, user (id, name, user_name)")
      .eq("user_id", id)
      .ilike("post", `%${search}%`)
      .gte("created_at", from)
      .lte("created_at", to);

    if (error) {
      console.error("Supabase error (fetchPostsById):", error.message);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return data ?? [];
  } catch (err) {
    console.error("fetchPostsById failed:", err);
    throw err;
  }
}

/**
 * Fetches a single post by its ID.
 * @param {string} id - Post ID.
 * @returns {Promise<Object>} - Post object.
 * @throws {Error} - Throws if ID is missing or fetch fails.
 */
export async function getPostById(id) {
  try {
    if (!id) {
      throw new Error("Post ID is required");
    }

    const { data, error } = await supabase
      .from("post")
      .select("*, user (id, name, user_name)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error (getPostById):", error.message);
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("getPostById failed:", err);
    throw err;
  }
}

/**
 * Fetches a post and checks if a user has liked it.
 * @param {string} postId - Post ID.
 * @param {string} userId - User ID.
 * @returns {Promise<{post: Object, hasLiked: boolean}>}
 * @throws {Error} - Throws if params are missing or fetch fails.
 */
export async function fetchPostAndLikeStatus(postId, userId) {
  try {
    if (!postId) {
      throw new Error("postId is required");
    }

    // Fetch the post
    const { data: post, error: postError } = await supabase
      .from("post")
      .select("*, user (id, name, user_name)")
      .eq("id", postId)
      .single();

    if (postError) {
      console.error("Error fetching post:", postError.message);
      throw new Error(`Failed to fetch post: ${postError.message}`);
    }

    let like = null;

    if (userId) {
      like = await getPostLikeStatus(userId, postId);
    }

    const hasLiked = like !== null;

    return { post, hasLiked };
  } catch (err) {
    console.error("fetchPostAndLikeStatus failed:", err);
    throw err;
  }
}

async function getPostLikeStatus(userId, postId) {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }

    // Check if user has liked the post
    const { data: like, error: likeError } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (likeError && likeError.code !== "PGRST116") {
      console.error("Error checking like status:", likeError.message);
      throw new Error(`Failed to check like status: ${likeError.message}`);
    }

    return like;
  } catch (error) {
    throw error;
  }
}

/**
 * Adds a new post comment.
 * @param {string} post - Post content.
 * @param {string} userId - User ID.
 * @returns {Promise<Object>} - Inserted post comment object.
 * @throws {Error} - Throws if params are missing or insert fails.
 */
export async function addPost(post, userId) {
  try {
    if (!post || !userId) {
      throw new Error("Both post content and userId are required.");
    }

    const { data, error } = await supabase
      .from("post")
      .insert([
        {
          post: post,
          user_id: userId,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting post_comment:", error.message);
      throw new Error(`Failed to add post: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("Insert succeeded but returned no data.");
    }

    return data[0];
  } catch (err) {
    console.error("addPost failed:", err);
    throw err;
  }
}

/**
 * Adds a comment to a post in the database.
 *
 * @param {string} postId - The UUID of the post being commented on.
 * @param {string} userId - The UUID of the user making the comment.
 * @param {string} comment - The content of the comment.
 * @returns {Promise<object>} - Returns the inserted comment object.
 * @throws {Error} - Throws an error if input validation fails or if the database insert operation fails.
 */
export async function postComment(postId, userId, comment) {
  try {
    if (!postId || !userId || !comment) {
      throw new Error("Missing postId, userId, or comment");
    }

    const { data, error } = await supabase
      .from("post_comment")
      .insert([
        {
          user_id: userId,
          post_id: postId,
          comment: comment,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error (postComment):", error.message);
      throw new Error(`Failed to post comment: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("Insert succeeded but returned no data.");
    }

    return data[0]; // Return the inserted comment
  } catch (err) {
    console.error("postComment failed:", err);
    throw err;
  }
}

/**
 * Loads comments for a given post.
 * @param {string} postId - Post ID.
 * @returns {Promise<Array>} - Array of comment objects.
 * @throws {Error} - Throws if postId is missing or fetch fails.
 */
export async function loadComments(postId) {
  try {
    if (!postId) {
      throw new Error("Missing postId");
    }

    const { data, error } = await supabase
      .from("post_comment")
      .select("*, user(id, name, user_name)")
      .eq("post_id", postId)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error (loadComments):", error.message);
      throw new Error(`Failed to load comments: ${error.message}`);
    }

    return data ?? [];
  } catch (err) {
    console.error("loadComments failed:", err);
    throw err;
  }
}

/**
 * Reports a comment and hides it.
 * @param {string} postId - Post ID.
 * @param {string} commentId - Comment ID.
 * @param {string} userId - User ID.
 * @param {string} reason - Reason for reporting.
 * @param {string} [additionalInfo] - Optional additional info.
 * @returns {Promise<{success: boolean, message: string}>}
 * @throws {Error} - Throws if params are missing or operation fails.
 */
export async function reportComment(
  postId,
  commentId,
  userId,
  reason,
  additionalInfo
) {
  try {
    if (!postId || !commentId || !userId || !reason) {
      throw new Error("Missing postId, commentId, userId, or reason");
    }

    // Insert report entry
    const { error: reportError } = await supabase
      .from("comment_report")
      .insert([
        {
          post_id: postId,
          comment_id: commentId,
          user_id: userId,
          reason: reason,
          additional_info: additionalInfo,
        },
      ])
      .select();

    if (reportError) {
      console.error(
        "Supabase error (reportComment - insert):",
        reportError.message
      );
      throw new Error(`Failed to report comment: ${reportError.message}`);
    }

    // Hide the comment
    const { error: commentError } = await supabase
      .from("post_comment")
      .update({ is_hidden: true })
      .eq("id", commentId);

    if (commentError) {
      console.error(
        "Supabase error (reportComment - update):",
        commentError.message
      );
      throw new Error(`Failed to hide comment: ${commentError.message}`);
    }

    return {
      success: true,
      message: "Comment reported and hidden successfully",
    };
  } catch (err) {
    console.error("reportComment failed:", err);
    throw err;
  }
}

/**
 * Reports a post by inserting a report record into the 'post_report' table in Supabase.
 * only if the same user has not already reported the same post.
 *
 * @param {string} postId - The ID of the post being reported.
 * @param {string} userId - The ID of the user reporting the post.
 * @param {string} reason - The reason for reporting the post (e.g., spam, offensive content).
 * @param {string} [additionalInfo] - Optional additional information about the report.
 * @throws Will throw an error if required parameters are missing or if the database operation fails.
 */
export async function reportPost(postId, userId, reason, additionalInfo) {
  try {
    if (!postId || !userId || !reason) {
      throw new Error("Missing postId, userId, or reason");
    }

    // Check if report already exists
    const { data: existingReports, error: fetchError } = await supabase
      .from("post_report")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (fetchError) {
      console.error(
        "Supabase error (check existing report):",
        fetchError.message
      );
      throw new Error(
        `Failed to check for existing report: ${fetchError.message}`
      );
    }

    let reportError;

    if (existingReports && existingReports.length > 0) {
      // Update existing report
      const { error: updateError } = await supabase
        .from("post_report")
        .update({
          reason,
          additional_info: additionalInfo,
        })
        .eq("post_id", postId)
        .eq("user_id", userId);

      reportError = updateError;
    } else {
      // Insert new report
      const { error: insertError } = await supabase
        .from("post_report")
        .insert([
          {
            post_id: postId,
            user_id: userId,
            reason,
            additional_info: additionalInfo,
          },
        ])
        .select();

      reportError = insertError;
    }

    if (reportError) {
      console.error("Supabase error (reportPost):", reportError.message);
      throw new Error(`Failed to report post: ${reportError.message}`);
    }

    return { success: true, message: "Report submitted successfully." };
  } catch (err) {
    console.error("reportPost failed:", err);
    throw err;
  }
}

/**
 * Deletes a comment by its ID.
 * @param {string} commentId - Comment ID.
 * @returns {Promise<{success: boolean, message: string}>}
 * @throws {Error} - Throws if commentId is missing or delete fails.
 */
export async function deleteComment(commentId) {
  try {
    if (!commentId) {
      throw new Error("Missing commentId");
    }

    const { error } = await supabase
      .from("post_comment")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Supabase error (deleteComment):", error.message);
      throw new Error(`Failed to delete comment: ${error.message}`);
    }

    return { success: true, message: "Comment deleted successfully." };
  } catch (err) {
    console.error("deleteComment failed:", err);
    throw err;
  }
}
