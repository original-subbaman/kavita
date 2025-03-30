import supabase from "../supabase_client/create_client";

export const recordLanguage = async ({ language, userId, postId }) => {
  const { data, errors } = await supabase.from("language").insert([
    {
      language: language,
      post_id: postId,
      user_id: userId,
    },
  ]);

  if (errors) {
    throw new Error(errors);
  }

  return data;
};

export const getLanguage = async ({ userId }) => {
  const { data: likedLanguages } = await supabase
    .from("language")
    .select("*")
    .eq("user_id", userId);
  return likedLanguages;
};
