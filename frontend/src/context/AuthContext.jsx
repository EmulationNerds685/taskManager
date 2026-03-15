import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";
import axiosInstance from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // Restore session on page refresh by hitting /auth/me
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};