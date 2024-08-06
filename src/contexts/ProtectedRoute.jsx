import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the path as needed

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  
  const userRole = (localStorage.getItem('role'));
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return children;
};

export default ProtectedRoute;
