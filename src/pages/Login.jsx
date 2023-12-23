import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import Label from "../components/UI/Label";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/api/auth/local`, {
                identifier: username,
                password,
            });

            const token = response.data.jwt;

            login(token);

            localStorage.setItem("token", token);

            navigate("/");
        } catch (error) {
            setError("Login failed");
            console.error("Login error:", error);
        }
    };

    return (
        <main className="grid h-screen place-items-center scale-[0.85] md:scale-100 select-none max-w-md mx-auto">
            <Card>
                <div className="mb-10">
                    <h1 className="mb-2 text-3xl font-bold">Log In</h1>
                    <p className="text-gray-500">
                        Enter your username and password to login.
                    </p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col">
                        <Label htmlFor="username">Username</Label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col relative">
                        <Label htmlFor="password">Password</Label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className=" border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none pr-14"
                        />
                        <span
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            className="absolute right-5 transform cursor-pointer translate-y-10">
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            )}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-black  py-3 font-medium text-white transition ease-linear hover:opacity-90 ">
                        Log In
                    </button>
                </form>
            </Card>
        </main>
        // <div className="flex items-center justify-center h-screen ">
        //     <div className="flex items-center flex-col space-y-10 md:bg-white md:py-20 md:px-28 md:rounded-md">
        //         <img src="/logo.png" alt="logo" className="w-24 h-24" />
        //         <div className="flex flex-col space-y-2">
        //             <h1 className="text-2xl uppercase text-zinc-800 font-semibold text-center">
        //                 login
        //             </h1>
        //             <p className="text-sm text-zinc-600 font-light text-center">
        //                 Masukkan informasi login kamu dengan semangat ujian.
        //             </p>
        //         </div>
        //         {error && (
        //             <p className="text-red-500 text-sm text-center">{error}</p>
        //         )}
        //         <form
        //             className="flex flex-col space-y-10"
        //             onSubmit={handleLogin}>
        //             {" "}
        //             <div className="flex flex-col space-y-6">
        //                 <div className="flex flex-col space-x-1 justify-center text-sm space-y-3 ">
        //                     <label
        //                         htmlFor=""
        //                         className="first-letter:uppercase">
        //                         username
        //                     </label>
        //                     <input
        //                         type="text"
        //                         value={username}
        //                         onChange={(e) => setUsername(e.target.value)}
        //                         className="focus:outline-none px-5 py-3 bg-gray-100 w-80 md:w-96 rounded-md"
        //                         placeholder="username"
        //                     />
        //                 </div>
        //                 <div className="flex flex-col space-x-1 justify-center text-sm space-y-3">
        //                     <label
        //                         htmlFor=""
        //                         className="first-letter:uppercase">
        //                         Password
        //                     </label>
        //                     <div className="flex items-center relative">
        //                         <input
        //                             type={showPassword ? "text" : "password"}
        //                             value={password}
        //                             onChange={(e) =>
        //                                 setPassword(e.target.value)
        //                             }
        //                             className="focus:outline-none px-5 py-3 bg-gray-100 w-80 md:w-96 rounded-md pr-10"
        //                             placeholder="********"
        //                         />
        //                         <span
        //                             onClick={() => {
        //                                 setShowPassword(!showPassword);
        //                             }}
        //                             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
        //                             {showPassword ? (
        //                                 <svg
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                     fill="none"
        //                                     viewBox="0 0 24 24"
        //                                     strokeWidth={1.5}
        //                                     stroke="currentColor"
        //                                     className="w-6 h-6">
        //                                     <path
        //                                         strokeLinecap="round"
        //                                         strokeLinejoin="round"
        //                                         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        //                                     />
        //                                     <path
        //                                         strokeLinecap="round"
        //                                         strokeLinejoin="round"
        //                                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //                                     />
        //                                 </svg>
        //                             ) : (
        //                                 <svg
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                     fill="none"
        //                                     viewBox="0 0 24 24"
        //                                     strokeWidth={1.5}
        //                                     stroke="currentColor"
        //                                     className="w-6 h-6">
        //                                     <path
        //                                         strokeLinecap="round"
        //                                         strokeLinejoin="round"
        //                                         d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        //                                     />
        //                                 </svg>
        //                             )}
        //                         </span>
        //                     </div>
        //                 </div>{" "}
        //             </div>
        //             <button
        //                 type="submit"
        //                 onClick={handleLogin}
        //                 className="bg-blue-500 w-80 md:w-96 py-3 text-white uppercase font-semibold rounded-md text-sm ">
        //                 login
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
};

export default Login;
