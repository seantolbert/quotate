import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider as AuthProvider } from "./context/AuthContext";
import { QuoteContextProvider as QuoteProvider } from "./context/QuoteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
