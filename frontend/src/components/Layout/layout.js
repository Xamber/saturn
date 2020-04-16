import saturnIcon from "../../assets/Saturn.svg";
import React from "react";

import "./layout.css"

const Logo = (props) => <div><img className={"logo"} src={saturnIcon} alt=""/></div>;

const Sidebar = (props) => <header>{props.children}</header>;

const Main = (props) => <main>{props.children}</main>;

const Footer = (props) => <footer>{props.children}</footer>;

const Divider = (props) => <div className={"divider"} style={{"maxWidth": props.maxWidth}}/>;

export {Main, Logo, Sidebar, Footer, Divider}