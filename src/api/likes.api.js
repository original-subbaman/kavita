import supabase from "../supabase_client/create_client";

export const getLikes = async ({ postId }) => {
  const data = await supabase.from("likes").select("*").eq("post_id", postId);
  return data;
};

export async function toggleLike(postId, userId) {
  console.log("🚀 ~ toggleLike ~ postId:", postId);
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
