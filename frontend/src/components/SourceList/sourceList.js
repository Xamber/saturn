import React from "react";
import "./sourceList.css";
import {Icon} from "../Article/article"

const Source = (props) => {
    return <a href={props.WebSite}><Icon link={props.WebSite} /> {props.Name}</a>
};

const SourceList = (props) => {
    let sources = props.sources.map((source) => <Source key={source.Id} {...source} />);
    let desc = props.desc;
    return <div className={"source-list"}>
        <p>
            Topic is <b>{desc.toLowerCase()}</b> <br/>
        </p>
        <p>
            <span>Sourses used on this page: <br/></span>
            {sources}
        </p>

    </div>
};

export default SourceList;