import supabase from "../supabase_client/create_client";

/**
 * Checks if a given username is available (i.e., not already taken).
 *
 * @param {Object} params - Parameters.
 * @param {string} params.username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the username is available, false if taken.
 */
export async function isUserNameAvailable({ username }) {
  try {
    const { data } = await supabase
      .from("user")
      .select("user_name")
      .eq("user_name", username)
      .single();

    // If data exists, username is taken
    return !data;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

/**
 * Updates user details in the database.
 *
 * @param {Object} params - Parameters.
 * @param {string} params.userId - The ID of the user to update.
 * @param {Object} params.user - An object containing the fields to update.
 * @returns {Promise<Object[]>} - Returns the updated user data.
 * @throws {Error} - Throws error if update fails.
 */
export async function updateUser({ userId, user }) {
  try {
    const { data, error } = await supabase
      .from("user")
      .update(user)
      .eq("id", userId)
      .select();

    if (error) {
      console.error("🚀 ~ updateUser ~ error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in updateUser:", error);
    throw error;
  }
}

/**
 * Retrieves user details by ID.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} - Returns the user data.
 * @throws {Error} - Throws error if retrieval fails.
 */
export async function getUser(userId) {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("🚀 ~ getUser ~ error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in getUser:", error);
    throw error;
  }
}

/**
 * Fetches post count for a user between given dates using a stored procedure.
 *
 * @param {string} userId - The UUID of the user.
 * @param {string} startDate - The start date in YYYY-MM-DD format.
 * @param {string} endDate - The end date in YYYY-MM-DD format.
 * @returns {Promise<Object>} - Returns the activity count data.
 * @throws {Error} - Throws error if stored procedure fails.
 */
export async function getUserActivityCount(userId, startDate, endDate) {
  try {
    const { data, error } = await supabase.rpc("get_posts_count_by_date", {
      user_uuid: userId,
      start_date: startDate,
      end_date: endDate,
    });

    if (error) {
      console.error("🚀 ~ getUserActivityCount ~ error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in getUserActivityCount:", error);
    throw error;
  }
}

export async function getLongestStreak(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const { data, error } = await supabase.rpc("longest_post_streak", {
      input_user_id: userId,
    });

    if (error) {
      console.error("🚀 ~ getLongestStreak ~ error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in getLongestStreak:", error);
    throw error;
  }
}
