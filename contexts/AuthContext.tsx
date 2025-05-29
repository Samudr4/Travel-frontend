import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { User } from '../types';
import * as api from '../apiService'; // Import the API service
import LoadingSpinner from '../components/LoadingSpinner';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loginUser: (email: string, password: string) => Promise<void>; // Changed passwordHash to password
  logoutUser: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<void>; // Changed passwordHash to password
  loading: boolean;
  error: string | null;
  clearError: () => void;
  // loginAdmin is removed as backend handles roles, isAdmin flag is sufficient
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      try {
        const response = await api.getCurrentUser();
        const user: User = response.data;
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      } catch (err) {
        localStorage.removeItem('token'); // Token might be invalid or expired
        console.error("Failed to load user:", err);
        // setError("Session expired. Please login again."); // Optional: notify user
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // No token, no user to load
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const loginUser = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.loginUser({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin');
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw err; // Re-throw to allow form to handle it
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.registerUser({ name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin');
      // Optionally, automatically log the user in by calling loadUser() or setting state directly
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Registration failed. Please try again.";
      setError(errorMessage);
      throw err; // Re-throw to allow form to handle it
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAdmin(false);
    // Optionally redirect to login page or home page
    // navigate('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        loginUser,
        logoutUser,
        registerUser,
        loading,
        error,
        clearError,
      }}
    >
      {/* Global loading spinner for auth actions if desired, or handle in components */}
      {/* Example: loading && <FullscreenSpinner /> */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Removed all localStorage user list management and mock user logic.
// Removed getUsersFromStorage, updateUserAuthState etc.
// Simplified to use token-based auth with backend.
