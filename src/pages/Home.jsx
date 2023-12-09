import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Helmet } from "react-helmet";

const Home = () => {
    const { isAuthenticated, token, logout } = useAuth();

    const handleLogout = () => {
        // Lakukan logout dan panggil fungsi logout dari context
        // Hapus token dari state autentikasi
        logout();
    };

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Link to={"/ujian"}>Ujian</Link>
            <h1>Welcome to the Home Page</h1>
            {isAuthenticated ? (
                <div>
                    <p>You are authenticated!</p>
                    <p>Your JWT Token: {token}</p>
                </div>
            ) : (
                <p>You are not authenticated.</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
