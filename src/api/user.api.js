import supabase from "../supabase_client/create_client";
import { v4 as uuid } from "uuid";

/**
 * Checks if a given username is available (i.e., not already taken).
 *
 * @param {Object} params - Parameters.
 * @param {string} params.username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the username is available, false if taken.
 */
export async function isUserNameAvailable({ username }) {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("user_name")
      .eq("user_name", username)
      .single();

    // If data exists, username is taken
    return !data;
  } catch (error) {
    console.error("Error checking username:", error);
    const code = error.code;
    if (code === "PGRST116") {
      return true;
    }
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
    if (!userId) throw new Error("userId is required");
    if (!user) throw new Error("User data is required");

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
export async function getUser(userId, table = "profiles") {
  try {
    const { data, error } = await supabase
      .from(table)
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

/**
 * @async
 * @function uploadProfile
 * @param {string} userId - The unique ID of the user.
 * @param {File} profile - The profile image file to upload (must be an image under 2MB).
 * @returns {Promise<{ path: string }>} An object containing the storage file path of the uploaded image.
 *
 * @throws {Error} If validation fails, the upload fails, or the database update fails.
 *
 */
export async function uploadProfile(userId, profile) {
  try {
    if (!userId) throw new Error("userId is missing");
    if (!profile) throw new Error("profile is required");

    if (!profile.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    if (profile.size > 1024 * 1024) {
      throw new Error("Image size must be under 2MB");
    }

    const fileExt = profile.name.split(".").pop();
    const fileName = `profile.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("profile_images")
      .upload(filePath, profile, { upsert: true });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("profile_images")
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("user")
      .update({ profile_url: filePath })
      .eq("id", userId);

    const { error: updateProfilesError } = await supabase
      .from("profiles")
      .update({ profile_link: filePath })
      .eq("id", userId);

    console.log("🚀 ~ uploadProfile ~ filePath:", filePath);
    if (updateError || updateProfilesError) {
      await supabase.storage.from("profile_images").remove([filePath]);
      throw error;
    }

    return { path: filePath, url: publicData.publicUrl };
  } catch (error) {
    console.error("🚀 ~ uploadProfile ~ error:", error);
    throw error;
  }
}

/**
 * Fetches the public profile image URL for a given user.
 * @async
 * @function getProfile
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<string>} The public URL of the user's profile image.
 * @throws {Error} If `userId` is not provided.
 * @throws {Error} If the database query fails.
 * @throws {Error} If no profile URL is found for the user.
 *
 */
export async function getProfile(userId) {
  try {
    if (!userId) throw new Error("userId is required");

    const { data, error } = await supabase
      .from("user")
      .select("profile_url")
      .eq("id", userId)
      .single();

    if (error) throw error;
    if (!data?.profile_url) return null;

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile_images").getPublicUrl(data.profile_url);

    return publicUrl;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Object} params - Function parameters.
 * @param {string} params.followerId - The UUID of the user who is following.
 * @param {string} params.followedId - The UUID of the user being followed.
 * @returns {Promise<{ success: boolean, message: string }>} - Resolves with a success object.
 * @throws {Error} - Throws if `followerId` or `followedId` are missing,
 *                   or if the Supabase insert fails.
 */
export async function followUser({ followerId, followedId }) {
  try {
    if (!followerId || !followedId) {
      throw new Error("Missing values: followerId or followedId");
    }

    const { data, error } = await supabase.from("followers").insert([
      {
        follower_id: followerId,
        followed_id: followedId,
      },
    ]);

    if (error) {
      throw new Error("Error following author: ", error);
    }

    return { success: true, message: "Followed successfully" };
  } catch (error) {
    console.error("🚀 ~ followUser ~ error:", error);
    throw error;
  }
}

/**
 * Checks if a follower → followed relationship exists in the `followers` table.
 * @function hasFollowed
 * @param {Object} params - Function parameters.
 * @param {string} params.followerId - The UUID of the user who may be following.
 * @param {string} params.followedId - The UUID of the user who may be followed.
 * @returns {Promise<boolean>} - Resolves with `true` if the relationship exists,
 *                               `false` otherwise.
 * @throws {Error} - Throws if required parameters are missing or if the Supabase query fails.
 *
 */
export async function hasFollowed({ followerId, followedId }) {
  try {
    if (!followedId || !followerId) {
      throw new Error("Missing values: followerId or followedId");
    }

    const { data, error } = await supabase
      .from("followers")
      .select("follower_id")
      .eq("follower_id", followerId)
      .eq("followed_id", followedId)
      .maybeSingle(); // returns null if not found

    if (error) {
      console.error("Error checking follow:", error);
      throw error;
    }

    return !!data;
  } catch (error) {
    throw error;
  }
}

/**
 * @async
 * @function unfollowUser
 * @param {Object} params - Function parameters.
 * @param {string} params.followerId - The UUID of the user who wants to unfollow.
 * @param {string} params.followedId - The UUID of the user being unfollowed.
 * @returns {Promise<{ success: boolean, message: string }>} - Resolves with a success object.
 * @throws {Error} - Throws if required parameters are missing or if the Supabase delete fails.
 */
export async function unfollowUser({ followerId, followedId }) {
  try {
    if (!followerId || !followedId) {
      throw new Error("Missing values: followerId or followedId");
    }

    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", followerId)
      .eq("followed_id", followedId);

    if (error) {
      throw new Error(`Error unfollowing user: ${error.message}`);
    }

    return { success: true, message: "Unfollowed successfully" };
  } catch (error) {
    console.error("🚀 ~ unfollowUser ~ error:", error);
    throw error;
  }
}

export async function getFollowerCount({ userId }) {
  try {
    if (!userId) {
      throw new Error("Missing parameter: userId");
    }

    const { count, error } = await supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("followed_id", userId);

    if (error) {
      throw error;
    }

    return count;
  } catch (error) {
    console.error("🚀 ~ getFollowerCount ~ error:", error);
    throw error;
  }
}
