import supabase from "../supabase_client/create_client";
import { startOfDay, endOfDay, formatISO } from "date-fns";

export async function fetchPosts({ date }) {
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    // .gte("created_at", formatISO(startOfDay(date)))
    .lte("created_at", formatISO(endOfDay(date)))
    .order("created_at", { ascending: false });
  return data;
}

export async function fetchPostsPagination({ pageParam }) {
  let query = supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    .order("created_at", { ascending: false })
    .limit(5);

  // If pageParam is provided, fetch posts created before this timestamp
  if (pageParam) {
    query = query.lt("created_at", pageParam);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Pagination error:", error);
    return { data: [], nextCursor: null };
  }

  const cursor = data?.length === 5 ? data[data.length - 1].created_at : null;
  return {
    data,
    // Set nextCursor to the last post's created_at if we have exactly 5 posts
    nextCursor: data?.length === 5 ? data[data.length - 1].created_at : null,
  };
}

export async function fetchPostsById({ id, from, to, search }) {
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    .eq("user_id", id)
    .ilike("post", `%${search}%`)
    .gte("created_at", from)
    .lte("created_at", to);
  return data;
}

export async function getPostById(id) {
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    .eq("id", id)
    .single();
  return data;
}

export async function fetchPostAndLikeStatus(postId, userId) {
  const { data: post, error: postError } = await supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    .eq("id", postId)
    .single();

  if (postError) {
    console.log("Error fetching posts: ", postError);
    return;
  }

  // Checking if user has liked the post
  const { data: like, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (likeError && likeError.code !== "PGRST116") {
    // PGRST116 indicates no rows were found, which is expected if the user hasn't liked the post
    console.error("Error checking like status:", likeError);
    return;
  }

  const hasLiked = like !== null;

  return { post, hasLiked };
}

export async function addPost(post, userId) {
  const { data, error } = await supabase.from("post_comment").insert([
    {
      post: post,
      user_id: userId,
    },
  ]);

  if (error) throw error;

  return data;
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
  if (!postId || !userId || !comment) {
    throw new Error("Missing postId or userId or comment");
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
    throw new Error(error.message || "Failed to post comment");
  }

  return data;
}

export async function loadComments(postId) {
  if (!postId) {
    throw new Error("Missing postId");
  }

  const { data, error } = await supabase
    .from("post_comment")
    .select("*, user(id, name, user_name)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load comments");
  }

  return data;
}

export async function deleteComment(commentId) {
  if (!commentId) {
    throw new Error("Missing commentId");
  }
  const { error } = await supabase
    .from("post_comment")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message || "Failed to delete comment");
  }

  return true;
}
