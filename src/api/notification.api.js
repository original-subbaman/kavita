import supabase from "../supabase_client/create_client";

/**
 * Fetches notifications for a specific user.
 * @param {string} userId - The ID of the user to fetch notifications for.
 * @returns {Promise<Array>} - Array of notification objects.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getNotificationForUser(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const { data, error } = await supabase
      .from("user_notification")
      .select("*")
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error (getNotificationForUser):", error.message);
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (err) {
    console.error("getNotificationForUser failed:", err);
    throw err;
  }
}

/**
 * Creates a notification for a post like if one does not already exist.
 * @param {string} postId - The ID of the post that was liked.
 * @param {string} recipientId - The ID of the user receiving the notification.
 * @param {string} senderId - The ID of the user who liked the post.
 * @param {string} message - The notification message.
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 * @throws {Error} - Throws if required parameters are missing or insert fails.
 */
export async function createNotificationForPostLike(
  postId,
  recipientId,
  senderId,
  message
) {
  try {
    // Validate required params
    if (!postId || !recipientId || !senderId || !message) {
      throw new Error(
        "All parameters (postId, recipientId, senderId, message) are required."
      );
    }

    // Check if notification already exists
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
        fetchError.message || "Failed to check existing notification."
      );
    }

    if (existingNotifications && existingNotifications.length > 0) {
      return {
        success: true,
        message: "Notification already exists",
        data: existingNotifications[0],
      };
    }

    // Insert new notification
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
        error.message || "Failed to create notification for post like."
      );
    }

    if (!data || data.length === 0) {
      throw new Error("Notification insert returned no data.");
    }

    return {
      success: true,
      message: "Notification created successfully",
      data: data[0],
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Removes a notification for a post like.
 * @param {string} postId - The ID of the post.
 * @param {string} recipientId - The ID of the user receiving the notification.
 * @param {string} senderId - The ID of the user who liked the post.
 * @returns {Promise<{success: boolean, message: string, data: object}|{success: false, message: string, error: Error}>}
 * @throws {Error} - Throws if required parameters are missing or delete fails.
 */
export async function removeNotificationForPost(postId, recipientId, senderId) {
  try {
    if (!postId || !recipientId || !senderId) {
      throw new Error(
        "All parameters (postId, recipientId, senderId) are required."
      );
    }

    const { data: deletedNotification, error: deleteError } = await supabase
      .from("user_notification")
      .delete()
      .eq("recipient_id", recipientId)
      .eq("sender_id", senderId)
      .eq("target_id", postId)
      .eq("type", "like")
      .eq("target_type", "post")
      .select();

    if (deleteError) {
      throw new Error(deleteError.message || "Failed to delete notification");
    }

    return {
      success: true,
      message: "Notification deleted successfully",
      data: deletedNotification[0],
    };
  } catch (error) {
    console.log("🚀 ~ removeNotificationForPost ~ error:", error);
    return {
      success: false,
      message: "An error occured",
      error,
    };
  }
}

function createNotificationForComment(postId, recipientId, senderId, message) {}
