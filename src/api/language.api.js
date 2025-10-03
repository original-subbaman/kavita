import supabase from "../supabase_client/create_client";

/**
 * Records the language used for a post by a user.
 * @param {Object} params
 * @param {string} params.language - The language to record.
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.postId - The ID of the post.
 * @returns {Promise<Array>} - Array containing the inserted language record.
 * @throws {Error} - Throws if insert fails or no data is returned.
 */
export async function recordLanguage({ language, userId, postId }) {
  try {
    const { data, error } = await supabase
      .from("language")
      .insert([
        {
          language: language,
          post_id: postId,
          user_id: userId,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Failed to record language: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from insert.");
    }

    return data;
  } catch (err) {
    console.log("🚀 ~ recordLanguage ~ err:", err);
    throw err;
  }
}

/**
 * Fetches all language records for a user.
 * @param {Object} params
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<Array>} - Array of language records.
 * @throws {Error} - Throws if fetch fails or no data is returned.
 */
export async function getLanguage({ userId }) {
  try {
    const { data, error } = await supabase
      .from("language")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Failed to fetch languages: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Fetches the count of language records for a specific user.
 * @param {string} userId - The ID of the user to fetch language count for.
 * @returns {Promise<number>} - The count of language records for the user.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getLanguageCount(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const { count, error } = await supabase
      .from("language")
      .select("", { count: "exact" })
      .eq("user_id", userId)
      .limit(1);

    if (error) {
      console.error("Supabase error (getLanguageCount):", error.message);
      throw new Error(`Failed to fetch language count: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error("🚀 ~ getLanguageCount ~ error:", error);
    throw error;
  }
}

export async function deleteLanguage({ userId, quoteId }) {
  try {
    if (!userId || !quoteId) {
      throw new Error("Missing parameter userId or quoteId");
    }

    const { error } = await supabase
      .from("language")
      .delete()
      .eq("user_id", userId)
      .eq("id", quoteId);

    if (error) {
      throw error;
    }

    return { success: true, message: "Quote deleted successfully" };
  } catch (error) {
    console.error("🚀 ~ deleteLanguage ~ error:", error);
    throw error;
  }
}
