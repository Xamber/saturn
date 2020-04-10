import React from "react";
import "./article.css";

import timeSince from "../../utils/timeSince";

const FaviconBase = "https://www.google.com/s2/favicons?domain=";

const Icon = (props) => {
    var hostname = (new URL(props.link)).hostname;
    let favicon = FaviconBase + hostname;
    return <img className="icon" alt={props.title} src={favicon}/>
};

const Link = (props) => <a target="_blank" href={props.link}>{props.title}</a>;

const Hint = (props) => <span className={"hint"}>
    <span className={"time"}> {timeSince(props.time)} ago by </span>
    <span className={"source"}><a href={props.website}>{props.title}</a></span>
</span>;

const Article = (article) => <li className="article">
    <Icon title={article.Title} link={article.Link}/>
    <Link title={article.Title} link={article.Link}/>
    <Hint time={article.Data} website={article.Source.WebSite} title={article.Source.Name}/>
</li>;


export default Article;