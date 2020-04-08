import saturnIcon from "../../assets/Saturn.svg";
import React from "react";

import "./layout.css"

const Logo = () => <div><img className={"logo"} src={saturnIcon} alt=""/></div>;

const Sidebar = (props) => <header>{props.children}</header>;
const Main = (props) => <main>{props.children}</main>;

export {Main, Logo, Sidebar}