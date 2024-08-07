import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer/>
<<<<<<< HEAD
    </AuthProvider>
=======
     </AuthProvider>
>>>>>>> 7d7db2964ad2855acd530c7e48c2ba9f059538a1
  );
}

export default App;
