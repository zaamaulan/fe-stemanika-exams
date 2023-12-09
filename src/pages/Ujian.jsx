import { useAuth } from "../context/useAuth";
import { Helmet } from "react-helmet";

const Ujian = () => {
    const { isAuthenticated, token } = useAuth();

    return (
        <div>
            <Helmet>
                <title>Ujian</title>
            </Helmet>
            <h1>Welcome to the Ujian Page</h1>
            {isAuthenticated ? (
                <div>
                    <p>You are authenticated!</p>
                    <p>Your JWT Token: {token}</p>
                </div>
            ) : (
                <p>You are not authenticated.</p>
            )}
        </div>
    );
};

export default Ujian;
