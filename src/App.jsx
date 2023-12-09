import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Ujian from "./pages/Ujian";
import PrivateWrapper from "./PrivateWrapper";

const routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateWrapper />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/ujian" element={<Ujian />}></Route>
                </Route>
                <Route path="/user/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default routes;
