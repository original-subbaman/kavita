import { createContext, useEffect, useState } from "react";
import { signIn } from "../api/auth.api";
import { getUser } from "../api/user.api";
import supabase from "../supabase_client/create_client";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user state (null or user object)
  const [loading, setLoading] = useState(true); // Loading state to track auth status
  const [session, setSession] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSessionAndUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await handleSession(session);
      setLoading(false);
    };

    fetchSessionAndUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await handleSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSession = async (session) => {
    if (session?.user) {
      try {
        const userDetails = await getUser(session.user.id);
        setSession(session);
        setUser({ ...session.user, ...userDetails });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUser(session.user);
      }
    } else {
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { error, session } = await signIn(email, password);
      if (error) throw error;

      await handleSession(session);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("🚀 ~ logout ~ error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, session, isAuthenticated }}
    >
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
