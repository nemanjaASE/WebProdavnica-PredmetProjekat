import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "./contexts/auth-context";
import CartProvider from "./contexts/CartProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID || ""}>
    <AuthContextProvider>
      <CartProvider>
       <App />
      </CartProvider>
      <ToastContainer />
    </AuthContextProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>
);