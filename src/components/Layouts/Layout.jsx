import React from "react";
import NavBar from "../Navigation/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>
            <div className="mt-28">
                <Outlet />
            </div>
        </React.Fragment>
    );
};

export default Layout;
