import React from "react";
import PropTypes from "prop-types";
import NavBar from "../Navigation/NavBar";

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>
        </React.Fragment>
    );
};

Layout.propTypes = {};

export default Layout;
