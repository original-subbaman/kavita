import supabase from "../supabase_client/create_client";

export async function getNotificationForUser(userId) {
  if (!userId) {
    throw new Error("Missing userId");
  }

  const { data, error } = await supabase
    .from("user_notification")
    .select("*")
    .eq("recipient_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to fetch notifications");
  }

  return data;
}

export async function createNotificationForPostLike(
  postId,
  recipientId,
  senderId,
  message
) {
  if (!postId || !recipientId || !senderId || !message) {
    throw new Error("Missing postId, recipientId, senderId or message");
  }

  const { data, error } = await supabase
    .from("user_notification")
    .insert([
      {
        target_id: postId,
        recipient_id: recipientId,
        sender_id: senderId,
        message: message,
        target_type: "post",
        type: "like",
      },
    ])
    .select();

  if (error) {
    throw new Error(
      error.message || "Failed to create notification for post like"
    );
  }

  return { success: true, data };
}

function createNotificationForComment(postId, recipientId, senderId, message) {}
