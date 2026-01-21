import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { authGate } from "./authGate"; // 🔒 staging lock

// 🔐 Run gate BEFORE React renders
authGate();

ReactDOM.createRoot(document.getElementById("root")).render(
 <HashRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</HashRouter>
);
