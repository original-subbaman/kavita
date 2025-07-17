import { createContext, useEffect, useState } from "react";
import { signIn } from "../api/auth.api";
import { getUser } from "../api/user.api";
import supabase from "../supabase_client/create_client";
import { AuthContext } from "./AuthContext";

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

      console.log("🚀 ~ fetchSessionAndUser ~ session:", session);
      if (session?.user) {
        try {
          const userDetails = await getUser(session.user.id);
          setSession(session);
          setUser({ ...session.user, ...userDetails }); // Merge auth and DB user
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setUser(session.user); // fallback to auth user only
        }
      } else {
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    fetchSessionAndUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        try {
          const userDetails = await getUser(session.user.id);
          setSession(session);
          setUser({ ...session.user, ...userDetails });
        } catch (error) {
          console.error(
            "Failed to fetch user details on auth state change:",
            error
          );
          setUser(session.user);
        }
      } else {
        setSession(null);
        setUser(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { user, session } = await signIn(email, password);
      setUser(user);
      setSession(session);
      setIsAuthenticated(true);
    } catch (error) {
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
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, session, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
