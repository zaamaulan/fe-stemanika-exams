
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

const PrivateWrapper = () => {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateWrapper;
