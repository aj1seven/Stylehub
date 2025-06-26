import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context Providers
import AuthProvider from "./context/Authcontext";
import CartProvider from "./context/CartContext";

// MUI base CSS
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
