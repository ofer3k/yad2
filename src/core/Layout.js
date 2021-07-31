import React from "react";
import Menu from "./Menu";
import "../styles.css";
import NavBar from './NavBar'
import LineNavBar from "./LineNavBar";
const mq = window.matchMedia( "(max-width: 690px)" );   

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        {/* <Menu /> */}
        {mq.matches?<NavBar />:<LineNavBar/>}
        {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
