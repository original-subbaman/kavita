import supabase from "../supabase_client/create_client";

export async function isUserNameAvailable({ username }) {
  const { data, error } = await supabase
    .from("user")
    .select("user_name")
    .eq("user_name", username)
    .single();

  if (error) {
    console.error("Error checking username:", error);
    return true;
  }

  return !data;
}

export async function updateUser({ userId, user }) {
  const { data, error } = await supabase
    .from("user")
    .update(user)
    .eq("id", userId)
    .select();
  if (error) {
    console.log("🚀 ~ updateUser ~ error:", error);
    throw error;
  }

  return data;
}

export async function getUser(userId) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    console.log("🚀 ~ getUser ~ error:", error);
    throw error;
  }

  return data;
}

export async function getUserActivityCount(userId, startDate, endDate) {
  const { data, error } = await supabase.rpc("get_posts_count_by_date", {
    user_uuid: userId,
    start_date: startDate,
    end_date: endDate,
  });

  if (error) {
    console.log("🚀 ~ getUserActivityCount ~ error:", error);
    throw error;
  }

  return data;
}
