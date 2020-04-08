import React from "react";
import "./article.css";

import timeSince from "../../utils/timeSince";


const Icon = (props) => <img className="icon" alt={props.title} src={props.icon}/>;

const Link = (props) => <a target="_blank" href={props.link}>{props.title}</a>;

const Hint = (props) => <span className={"hint"}>
    <span className={"time"}> {timeSince(props.time)} ago by </span>
    <span className={"source"}><a href={props.website}>{props.title}</a></span>
</span>;

const Article = (article) => <li className="article">
    <Icon title={article.Title} icon={article.Icon}/>
    <Link link={article.Link} title={article.Title}/>
    <Hint time={article.Data} website={article.Source.WebSite} title={article.Source.Name}/>
</li>;


export default Article;