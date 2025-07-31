import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import supabase from "../supabase_client/create_client";

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
export async function getTodaysNotificationCount(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const start = dayjs().startOf("day").utc().format();
    const end = dayjs().endOf("day").utc().format();

    const { error, count } = await supabase
      .from("user_notification")
      .select("", { count: "exact" })
      .eq("recipient_id", userId)
      .gte("created_at", start)
      .lte("created_at", end)
      .limit(1);

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
