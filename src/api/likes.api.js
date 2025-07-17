import supabase from "../supabase_client/create_client";

/**
 * Fetches all likes for a given post.
 * @param {Object} params
 * @param {string} params.postId - The ID of the post to fetch likes for.
 * @returns {Promise<Array>} - Array of like objects.
 * @throws {Error} - Throws if postId is missing or fetch fails.
 */
export const getLikes = async ({ postId }) => {
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId);

    if (error) {
      throw new Error(`Failed to fetch likes: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Toggles the like status for a post by a user.
 * If the user has already liked the post, removes the like; otherwise, adds a like.
 * @param {string} postId - The ID of the post to like or unlike.
 * @param {string} userId - The ID of the user toggling the like.
 * @returns {Promise<{success: boolean, isLiked: boolean, message: string, error?: Error}>}
 * @throws {Error} - Throws if database operations fail.
 */
export async function toggleLike(postId, userId) {
  try {
    const { data: existing, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError.code);
      return {
        success: false,
        message: "Could not check like status.",
        error: fetchError,
      };
    }

    if (existing) {
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId)
        .select();

      if (deleteError) {
        console.error("Error removing like:", deleteError);
        return {
          success: false,
          message: "Failed to remove like.",
          error: deleteError,
        };
      }

      return {
        success: true,
        isLiked: false,
        message: "Like removed successfully.",
      };
    }

    const { error: insertError } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: userId }]);

    if (insertError) {
      console.error("Error adding like:", insertError);
      return {
        success: false,
        message: "Failed to like the post.",
        error: insertError,
      };
    }

    return {
      success: true,
      isLiked: true,
      message: "Post liked successfully.",
    };
  } catch (error) {
    console.log("🚀 ~ toggleLike ~ error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
      error,
    };
  }
}
