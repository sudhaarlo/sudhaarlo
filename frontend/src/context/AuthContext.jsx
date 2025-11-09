import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// ✅ Create and export the context
const AuthContext = createContext();
export { AuthContext };

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          axios.defaults.headers.common['x-auth-token'] = token;
          const res = await axios.get(`${API_URL}/auth/me`);
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          delete axios.defaults.headers.common['x-auth-token'];
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (loginData) => {
    const res = await axios.post(`${API_URL}/auth/login`, loginData);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setToken(token);
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const register = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setToken(token);
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, register, logout }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}

// ✅ Default export
export default AuthContext;
