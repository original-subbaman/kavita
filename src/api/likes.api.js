import supabase from "../supabase_client/create_client";

export const getLikes = async ({ postId }) => {
  const data = await supabase.from("likes").select("*").eq("post_id", postId);
  return data;
};

export async function toggleLike(postId, userId) {
  const { data: existing, error: fetchError } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error(fetchError.code);
    throw new Error("Error fetching like status");
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (deleteError) console.error("Delete failed:", deleteError);
    else console.log("Unliked post");
  } else {
    const { error: insertError } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: userId }]);

    if (insertError)
      throw new Error("Error liking post: " + insertError.message);
  }
}
