import React from "react";
import "../css/styles.css";
import NavBar from './NavBar'
import LineNavBar from "./LineNavBar";
const mq = window.matchMedia( "(max-width: 690px)" );   

const Layout = ({
    className,
    children
}) => (
    <div>
        {mq.matches?<NavBar />:<LineNavBar/>}
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
