import supabase from "../supabase_client/create_client";

/**
 * Records a quote for a post by a user.
 * @param {Object} params
 * @param {string} params.language - The language of the quote.
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.postId - The ID of the post.
 * @returns {Promise<Array>} - Array containing the inserted quote record.
 * @throws {Error} - Throws if insert fails or no data is returned.
 */
export async function recordQuote({ language, userId, postId }) {
  try {
    const { data, error } = await supabase
      .from("quotes")
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
    console.log("🚀 ~ recordQuote ~ err:", err);
    throw err;
  }
}

/**
 * Fetches all quote records for a user.
 * @param {Object} params
 * @param {string} params.userId - The ID of the user.
 * @param {Object} params.filters - Filters to apply to the query.
 * @param {string} params.filters.poet - Filter by poet name.
 * @returns {Promise<Array>} - Array of language records.
 * @throws {Error} - Throws if fetch fails or no data is returned.
 */
export async function getQuote({ userId, filters = {} }) {
  try {
    let whereClause = {
      in_user_id: userId,
    };

    if (filters.poet) {
      whereClause["poet"] = filters.poet;
    }

    if (filters.quote) {
      whereClause["quote"] = filters.quote;
    }

    const { data, error } = await supabase.rpc(
      "get_quotes_with_post",
      whereClause,
    );

    if (error) {
      throw new Error(`Failed to fetch languages: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data returned from Supabase.");
    }

    return data;
  } catch (err) {
    console.log("🚀 ~ getQuote ~ err:", err);
    return [];
  }
}

/**
 * Fetches the count of quote records for a specific user.
 * @param {string} userId - The ID of the user to fetch quote count for.
 * @returns {Promise<number>} - The count of quote records for the user.
 * @throws {Error} - Throws if userId is missing or fetch fails.
 */
export async function getQuotesCount(userId) {
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }

    const { count, error } = await supabase
      .from("quotes")
      .select("", { count: "exact" })
      .eq("user_id", userId)
      .limit(1);

    if (error) {
      console.error("Supabase error (getQuotesCount):", error.message);
      throw new Error(`Failed to fetch quotes count: ${error.message}`);
    }

    return count || 0;
  } catch (error) {
    console.error("🚀 ~ getQuotesCount ~ error:", error);
    throw error;
  }
}

export async function deleteQuote({ userId, quoteId }) {
  try {
    if (!userId || !quoteId) {
      throw new Error("Missing parameter userId or quoteId");
    }

    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("user_id", userId)
      .eq("id", quoteId);

    if (error) {
      throw error;
    }

    return { success: true, message: "Quote deleted successfully" };
  } catch (error) {
    console.error("🚀 ~ deleteQuote ~ error:", error);
    throw error;
  }
}
