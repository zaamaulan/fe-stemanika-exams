import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const navigate = useNavigate();

    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };

    const handleLinkClick = (path) => {
        setShowNavLinks(false);
        navigate(path);
    };

    return (
        <nav className="xl:px-40 xl:py-6 fixed w-full top-0 bg-white backdrop-filter backdrop-blur-lg bg-opacity-50 z-50">
            <div className="hidden xl:flex xl:items-center xl:justify-between xl:gap-x-10">
                <div className="text-xl font-semibold tracking-wide">
                    Stemanika Exam
                </div>
                <div className="xl:flex xl:items-center xl:gap-x-10 xl:mr-20">
                    <Link to={"/"} className="tracking-wide">
                        Beranda
                    </Link>
                    <Link to={"/exam"} className="tracking-wide">
                        Ujian
                    </Link>
                    <Link to={"/guide"} className="tracking-wide">
                        Panduan Ujian
                    </Link>
                    <Link to={"/annoucement"} className="tracking-wide">
                        Pengumuman
                    </Link>
                    <Link to={"/result"} className="tracking-wide">
                        Hasil
                    </Link>
                    <Link to={"/about"} className="tracking-wide">
                        Tentang Kami
                    </Link>
                </div>
                <Link to={"/profile"}>
                    <img
                        src="/profile.jpg"
                        alt=""
                        className="xl:w-10 xl:rounded-full"
                    />
                </Link>
            </div>
            <div className={`flex justify-between items-center xl:hidden bg-white px-8 py-6 transition-all duration-500 ease-in-out ${showNavLinks ? 'bg-white' : 'backdrop-filter backdrop-blur-lg bg-opacity-50'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 1, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}>
                    <div className="" onClick={toggleNavLinks}>
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
                                d="M3.75 9h16.5m-16.5 6.75h16.5"
                            />
                        </svg>
                    </div>
                    <div
                        className={`xl:hidden transition-transform transform absolute flex flex-col py-12 px-10 space-y-6 w-full bg-white mt-7 duration-500 ease-in-out text-sm items-center ${
                            showNavLinks
                                ? "-translate-x-8"
                                : "-translate-x-[100vw]"
                        }`}>
                        <Link to="/" onClick={() => handleLinkClick("/")}>
                            Home
                        </Link>
                        <Link
                            to="/ujian"
                            onClick={() => handleLinkClick("/ujian")}>
                            Ujian
                        </Link>
                    </div>
                </motion.div>
                <div className="text-base font-medium">Stemanika Exam</div>
                <Link to={"/profile"}>
                    <img
                        src="/profile.jpg"
                        alt=""
                        className="w-8 rounded-full"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
