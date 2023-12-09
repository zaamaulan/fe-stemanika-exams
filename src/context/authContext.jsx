// AuthProvider.js
import PropTypes from "prop-types";
import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../hooks/authReducer";

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem("token") || null,
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (token) => {
        dispatch({ type: "LOGIN", payload: token });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token"); // Hapus token dari localStorage saat logout
    };

    useEffect(() => {
        // Cek token saat komponen dimuat untuk memperbarui status otentikasi
        if (localStorage.getItem("token")) {
            login(localStorage.getItem("token"));
        }
    }, []); // [] sebagai dependensi untuk menjalankan efek hanya sekali saat komponen dimuat

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export { AuthContext, AuthProvider };

