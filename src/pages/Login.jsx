import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/local`, {
                identifier: email,
                password,
            });

            const token = response.data.jwt;

            login(token);

            localStorage.setItem("token", token);

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        // <div>
        //     <label>Email:</label>
        //     <input
        //         type="text"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //     />

        //     <label>Password:</label>
        //     <input
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />

        //     <button onClick={handleLogin}>Login</button>
        // </div>
        <div>
            <h1 className="text-lg uppercase text-zinc-800 font-bold">login</h1>
            <p>Setiap langkah menuju kesuksesan dimulai dari tindakan kecil. Masukkan informasi loginmu dengan semangat ujian.</p>
        </div>
    );
};

export default Login;
