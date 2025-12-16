import supabase from "../supabase_client/create_client";

export async function verifyCaptcha(token) {
  try {
    const { data, error } = await supabase.functions.invoke(
      "verify-recaptcha",
      {
        body: { token },
      }
    );
    if (error) throw error;
    if (!data?.success) throw new Error("Captcha failed");
    return data;
  } catch (err) {
    console.log("🚀 ~ verifyCaptcha ~ err:", err);
    // Optionally, you can add logging here
    throw new Error(err.message || "Captcha verification failed");
  }
}
