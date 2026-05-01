import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // In production, this would be an environment variable. For Railway, we can leave it to just hitting the relative path if served together, or hardcode/detect.
  // Using an empty string base URL if we set up a proxy, or explicit localhost for dev.
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (token) {
      axios.get(`${apiBase}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        logout();
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, apiBase]);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const res = await axios.post(`${apiBase}/auth/login`, formData);
    localStorage.setItem('token', res.data.access_token);
    setToken(res.data.access_token);
  };

  const signup = async (name, email, password, role) => {
    await axios.post(`${apiBase}/auth/signup`, { name, email, password, role });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, apiBase }}>
      {children}
    </AuthContext.Provider>
  );
};
