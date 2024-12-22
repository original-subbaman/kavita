import supabase from "../supabase_client/create_client";

export const getLikes = async ({ postId }) => {
  const data = await supabase.from("likes").select("*").eq("post_id", postId);
  return data;
};

export const addLikes = async ({ postId, userId }) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) {
    console.log("Error adding likes: ", error);
    throw new Error(error);
  }

  return { success: true };
};
