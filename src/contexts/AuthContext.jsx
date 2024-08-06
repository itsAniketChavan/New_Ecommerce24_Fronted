import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {

  // Initialize state with data from localStorage
  // const [user, setUser] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    return storedUser && storedRole && storedToken ? true : false;
  });

 

  useEffect(() => {
    // logout()
    // console.log(2);
   
  }, []);

  const login = (userData) => {
    console.log(userData)
    // setUser(userData.user);
    setIsAuthenticated(true);
    localStorage.setItem('user',   JSON.stringify(userData.user));
    localStorage.setItem('role',  (userData.user.role));
    localStorage.setItem('token',  (userData.token));
    // console.log(localStorage)
  };

  const logout = () => {
    // setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
