import supabase from "../supabase_client/create_client";

export async function isUserNameAvailable({ username }) {
  const { data, error } = await supabase
    .from("user")
    .select("user_name")
    .eq("user_name", username)
    .single();

  if (error) {
    console.error("Error checking username:", error);
    return false;
  }

  return !data;
}
