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
export const recordLanguage = async ({ language, userId, postId }) => {
  try {
    const { data, error } = await supabase.from("language").insert([
      {
        language: language,
        post_id: postId,
        user_id: userId,
      },
    ]);

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
};

/**
 * Fetches all language records for a user.
 * @param {Object} params
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<Array>} - Array of language records.
 * @throws {Error} - Throws if fetch fails or no data is returned.
 */
export const getLanguage = async ({ userId }) => {
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
};
