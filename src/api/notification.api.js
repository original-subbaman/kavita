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
    throw new Error(
      "All parameters (postId, recipientId, senderId, message) are required."
    );
  }

  const { data: existingNotifications, error: fetchError } = await supabase
    .from("user_notification")
    .select("id")
    .eq("recipient_id", recipientId)
    .eq("sender_id", senderId)
    .eq("target_id", postId)
    .eq("type", "like")
    .eq("target_type", "post");

  if (fetchError) {
    throw new Error(
      fetchError.message || "Failed to check existing notification"
    );
  }

  if (existingNotifications && existingNotifications.length > 0) {
    return {
      success: true,
      message: "Notification already exists",
      data: existingNotifications[0],
    };
  }

  const { data, error } = await supabase
    .from("user_notification")
    .insert([
      {
        target_id: postId,
        recipient_id: recipientId,
        sender_id: senderId,
        message,
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

  return {
    success: true,
    message: "Notification created successfully",
    data: data[0],
  };
}

function createNotificationForComment(postId, recipientId, senderId, message) {}
