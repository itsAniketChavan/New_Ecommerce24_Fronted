import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HomePage from "../components/home/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProductDetails from "../components/product/ProductDetail";
import Categories from "../components/home/Categories";
import Account from "../components/profile/AccountPage";
import Vendor from "../components/vendor/VendorAccount";
import CheckoutPage from "../pages/CheckoutPage";
import ProtectedRoute from "../contexts/ProtectedRoute"; // Import ProtectedRoute
import Unauthorized from "../pages/Unauthorized";
import NotFoundPage from "../pages/NotFoundPage";
import ErrorPage from "../pages/ErrorPage"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
       
        
     { /*testing*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/error" element={<ErrorPage />} />
       

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Navbar />
              <Categories />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  
                   
                  
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute roles={["user"]}>
                        <Account />
                       </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vendor"
                    element={
                      <ProtectedRoute roles={["vendor"]}>
                        <Vendor />
                     </ProtectedRoute>  
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute roles={["user"]}>
                        <CheckoutPage />
                        </ProtectedRoute>
                    }
                  />
                   <Route path="/*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        
 
      </Routes>
    </Router>
  );
};

export default AppRoutes;
