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

export async function editPost(post) {}
