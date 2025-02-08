import supabase from "../supabase_client/create_client";

async function signUpWithEmail(email, password, userData) {
  const { data: authData, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: userData.name,
      },
    },
  });

  if (error) {
    console.error("Sign up error:", error.message);
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("user")
    .insert([
      {
        id: authData.user?.id,
        username: userData.username,
        name: userData.name,
        address: userData.address,
        gender: userData.gender,
        created_at: new Date(),
      },
    ]);

  if (profileError) {
    console.error("Profile creation error:", profileError.message);
    return null;
  }

  return {
    authData,
    profileData,
  };
}

async function signIn(email, password) {}

export { signUpWithEmail };
