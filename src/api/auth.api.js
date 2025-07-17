import supabase from "../supabase_client/create_client";

/**
 * Signs up a user with email, password, and name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} name - The user's name.
 * @returns {Promise<Object>} - Supabase sign up response.
 * @throws {Error} - Throws if sign up fails.
 */
async function signUpWithEmail(email, password, name) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("signUpWithEmail failed:", err);
    throw err;
  }
}

/**
 * Updates the user's profile data in the database.
 * @param {Object} userData - The user's profile data.
 * @param {string} userData.id - The user's ID.
 * @param {string} userData.userName - The user's username.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.address - The user's address.
 * @param {string} userData.gender - The user's gender.
 * @returns {Promise<Object>} - Supabase insert response.
 * @throws {Error} - Throws if insert fails.
 */
async function updateProfileData(userData) {
  try {
    const { data, error } = await supabase.from("user").insert([
      {
        id: userData.id,
        user_name: userData.userName,
        name: userData.name,
        address: userData.address,
        gender: userData.gender,
        created_at: new Date(),
      },
    ]);

    if (error) {
      throw new Error(`Profile update failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("updateProfileData failed:", err);
    throw err;
  }
}

/**
 * Signs in a user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: Object, session: Object}>} - Signed in user and session data.
 * @throws {Error} - Throws if sign in fails.
 */
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: username } = await supabase
      .from("user")
      .select("user_name")
      .eq("id", data.user.id)
      .single();

    if (error) {
      throw error;
    }

    // User signed in successfully
    return {
      user: { ...data.user, ...username },
      session: data.session,
    };
  } catch (error) {
    throw error;
  }
}

export { signIn, signUpWithEmail, updateProfileData };
