import supabase from "../client/create_client";
import { startOfDay, endOfDay, formatISO } from "date-fns";

export async function fetchPosts() {
  const now = new Date();
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name, user_name)")
    .gte("created_at", formatISO(startOfDay(now)))
    .lte("created_at", formatISO(endOfDay(now)));
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
    .single();

  if (likeError && likeError.code !== "PGRST116") {
    // PGRST116 indicates no rows were found, which is expected if the user hasn't liked the post
    console.error("Error checking like status:", likeError);
    return;
  }

  const hasLiked = like !== null;

  return { post, hasLiked };
}

export async function addPost(post) {
  const { data, errors } = await supabase.from("post").insert([
    {
      post: post,
      user_id: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
    },
  ]);

  if (errors) {
    console.log("Error inserting data", error);
    return;
  }
  return data;
}
