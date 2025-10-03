import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import supabase from "../supabase_client/create_client";
import { NotificationTarget, NotificationType } from "../utils/Constants";

dayjs.extend(utc);

/**
 * Fetches notifications for a specific user for the current day.
 * @param {string} userId - The ID of the user to fetch notifications for.
 * @returns {Promise<Array>} - Array of notification objects.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getTodaysNotificationForUser(
  userId,
  fromOffset,
  toOffset
) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const start = dayjs().startOf("day").utc().format();
    const end = dayjs().endOf("day").utc().format();

    const { data, error } = await supabase
      .from("user_notification")
      .select("*")
      .eq("recipient_id", userId)
      .gte("created_at", start)
      .lte("created_at", end)
      .order("created_at", { ascending: false })
      .range(fromOffset, toOffset);

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
 * Fetches the count of notifications for a specific user for the current day.
 * @param {string} userId - The ID of the user to fetch notification count for.
 * @returns {Promise<number>} - The count of today's notifications.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getNotificationCount(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const { error, count } = await supabase
      .from("user_notification")
      .select("", { count: "exact", head: true })
      .eq("recipient_id", userId)
      .eq("is_seen", false);

    if (error) {
      console.error("Supabase error (getNotificationForUser):", error.message);
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.log("🚀 ~ getTodaysNotificationCoun ~ error:", error);
    throw error;
  }
}

/**
 * Fetches recent notifications for a user before today.
 * @param {string} userId - The ID of the user to fetch notifications for.
 * @param {number} fromOffset - The starting index for pagination.
 * @param {number} toOffset - The ending index for pagination.
 * @returns {Promise<Array>} - Array of notification objects.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getRecentNotifications(userId, fromOffset, toOffset) {
  try {
    if (!userId) {
      throw new Error("Missing parameter userId");
    }

    const startOfToday = dayjs().startOf("day").utc().format();

    const { data, error } = await supabase
      .from("user_notification")
      .select("*")
      .eq("recipient_id", userId)
      .lte("created_at", startOfToday)
      .order("created_at", { ascending: false })
      .range(fromOffset, toOffset);

    if (error) {
      console.error("Supabase error (getNotificationForUser):", error.message);
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (error) {
    console.log("🚀 ~ getRecentNotifications ~ error:", error);
    throw err;
  }
}

/**
 * Checks if a notification with the given parameters already exists in the `user_notification` table.
 *
 * @async
 * @function checkIsDuplicateNotification
 * @param {string|number} postId - The ID of the post associated with the notification (mapped to `target_id`).
 * @param {string|number} recipientId - The ID of the notification recipient.
 * @param {string|number} senderId - The ID of the notification sender.
 * @param {string} type - The type/category of the notification.
 * @param {string} target - The target entity type (e.g., "post", "comment").
 * @returns {Promise<boolean>} Resolves to `true` if a matching notification already exists, otherwise `false`.
 * @throws {Error} If the database query fails.
 */
async function checkIsDuplicateNotification(
  postId,
  recipientId,
  senderId,
  type,
  target
) {
  const { data: existingNotifications, error: fetchError } = await supabase
    .from("user_notification")
    .select("id")
    .eq("recipient_id", recipientId)
    .eq("sender_id", senderId)
    .eq("target_id", postId)
    .eq("type", type)
    .eq("target_type", target);

  if (fetchError) {
    throw new Error(
      fetchError.message || "Failed to check existing notification."
    );
  }

  if (existingNotifications && existingNotifications.length > 0) {
    return true;
  }

  return false;
}

/**
 * Creates a notification for a post like if one does not already exist.
 * @param {string} postId - The ID of the post that was liked.
 * @param {string} recipientId - The ID of the user receiving the notification.
 * @param {string} senderId - The ID of the user who liked the post.
 * @param {string} message - The notification message.
 * @param {string} type - like, post or comment.
 * @param {string} target - post or comment.
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 * @throws {Error} - Throws if required parameters are missing or insert fails.
 */
export async function createNotification(
  postId,
  recipientId,
  senderId,
  message,
  type,
  target
) {
  try {
    if (!postId || !recipientId || !senderId || !message || !type || !target) {
      throw new Error(
        "All parameters (postId, recipientId, senderId, message, type, target) are required."
      );
    }

    const isDuplicateNotification = await checkIsDuplicateNotification(
      postId,
      recipientId,
      senderId,
      NotificationType.quote,
      NotificationTarget.post
    );

    if (isDuplicateNotification) {
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
          target_type: target,
          type: type,
        },
      ])
      .select();

    if (error) {
      throw new Error(
        error.message || "Failed to create notification for quoting."
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
  } catch (error) {
    console.log("🚀 ~ createNotificationForQuote ~ error:", error);
    return {
      success: false,
      message: "An error occured",
      error,
    };
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

/**
 * Marks all unseen notifications as seen for a given user.
 * @function updateNotificationSeenState
 * @param {Object} params - Function parameters.
 * @param {string|number} params.userId - The ID of the user whose notifications should be marked as seen.
 * @returns {Promise<{success: boolean, message: string, error?: Error}>}
 */
export async function updateNotificationSeenState({ userId }) {
  try {
    if (!userId) {
      throw new Error("Missing parameter: userId");
    }

    const { data, error } = await supabase
      .from("user_notification")
      .update({ is_seen: true })
      .eq("recipient_id", userId)
      .eq("is_seen", false);
    if (error) {
      throw new Error(error.message || "Failed to update notification");
    }

    return {
      success: true,
      message: "Notification 'seen' state updated",
    };
  } catch (error) {
    console.log("🚀 ~ updateNotificationSeenState ~ error:", error);
    return {
      success: false,
      message: "An error occured",
      error,
    };
  }
}

export async function notifyNewFollower({ followerId, followedId, message }) {
  try {
    if (!followedId || !followerId) {
      throw new Error("Missing parameter: userId or followerId");
    }

    const { error } = await supabase.from("user_notification").insert({
      recipient_id: followedId,
      sender_id: followerId,
      type: "new_follower",
      message: message,
      target_type: "user",
      target_id: followedId,
    });

    if (error) {
      throw new Error(
        error.message || "Failed to create notification for new follower."
      );
    }

    if (!data || data.length === 0) {
      throw new Error("Notification insert returned no data.");
    }

    return {
      success: true,
      message: "Notification created successfully",
    };
  } catch (error) {
    console.log("🚀 ~ notifyNewFollower ~ error:", error);
    return {
      success: false,
      error,
    };
  }
}
