import React from "react";
import "./SourceList.css";
import {Icon} from "../Article/article"

const Source = (props) => {
    return <a href={props.WebSite}><Icon link={props.WebSite} /> {props.Name}</a>
};

const SourceList = (props) => {
    let sources = props.sources.map((source) => <Source key={source.Id} {...source} />);
    return <div className={"source-list"}>{sources}</div>
};

export default SourceList;