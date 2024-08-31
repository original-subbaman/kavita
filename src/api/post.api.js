import supabase from "../client/create_client";
import { startOfDay, endOfDay, formatISO } from "date-fns";

export async function fetchPosts() {
  const now = new Date();
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name)")
    .gte("created_at", formatISO(startOfDay(now)))
    .lte("created_at", formatISO(endOfDay(now)));
  return data;
}

export async function fetchAPost(id) {
  const { data } = await supabase
    .from("post")
    .select("*, user (id, name)")
    .eq("id", id);
  return data[0];
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
