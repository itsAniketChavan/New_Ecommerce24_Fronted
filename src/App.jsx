import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer/>
    </AuthProvider>
  );
}

export default App;
