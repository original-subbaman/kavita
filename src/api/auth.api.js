import supabase from "../supabase_client/create_client";

async function signUpWithEmail(email, password, name) {
  return await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });
}

async function updateProfileData(userData) {
  return await supabase.from("user").insert([
    {
      id: userData.id,
      user_name: userData.userName,
      name: userData.name,
      address: userData.address,
      gender: userData.gender,
      created_at: new Date(),
    },
  ]);
}

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
