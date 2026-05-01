import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Since we are now serving the frontend from the backend in production, we can just use the relative path (empty string)
  // But in local development, if we run them separately, we default to localhost:8000
  const isDevelopment = window.location.hostname === 'localhost' && window.location.port === '5173';
  const apiBase = isDevelopment ? 'http://localhost:8000' : '';

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
