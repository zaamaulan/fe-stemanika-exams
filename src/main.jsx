import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <App />
            </AuthProvider>{" "}
        </HelmetProvider>
    </React.StrictMode>
);
