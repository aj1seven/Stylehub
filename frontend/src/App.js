import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./customer/Cart";
import Checkout from "./customer/Checkout";
import SellerDashboard from "./seller/SellerDashboard";

// Context
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";

// UI
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Protected */}
        <Route
          path="/cart"
          element={role === "Customer" ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={role === "Customer" ? <Checkout /> : <Navigate to="/login" />}
        />

        {/* Seller Protected */}
        <Route
          path="/seller/dashboard"
          element={role === "Seller" ? <SellerDashboard /> : <Navigate to="/login" />}
        />

        {/* 404 fallback */}
        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
