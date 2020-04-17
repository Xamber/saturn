import React from "react";
import "./article.css";

const FaviconBase = "https://www.google.com/s2/favicons?domain=";

const Icon = (props) => {
    try {
        var hostname = (new URL(props.link)).hostname;
        let favicon = FaviconBase + hostname;
        return <img className="icon" alt={props.title} src={favicon}/>
    } catch (e) {
        console.error(e, props.link);
        return <img className="icon" alt={props.link} src={FaviconBase + props.link}/>
    }
};

const Link = (props) => <a target="_blank" rel="noopener noreferrer" href={props.link}>{props.title}</a>;

const Hint = (props) => {
    let time = new Date(props.time);
    return <span className={"hint"}>
    <span className={"time"}> {`${time.toLocaleTimeString()}`} by </span>
    <span className={"source"}><a href={props.website}>{props.title}</a></span>
</span>;
};

const Article = (article) => <li className="article">
    <Icon title={article.Title} link={article.Link}/>
    <Link title={article.Title} link={article.Link}/>
    <Hint time={article.Data} website={article.Source.WebSite} title={article.Source.Name}/>
</li>;


export {Article, Icon};