import React from "react";
import {Article} from "../Article/article";

import "./articleList.css"

const Divider = (props) => <div className={"divider"}>{props.day}</div>;


const ArticleList = (props) => {
    let prevDay = -1;
    let articles = [];

    for (let article of props.articlies) {
        let date = new Date(article.Data);
        let day = date.getUTCDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day !== prevDay ) {
            articles.push(<Divider day={`${day}.${month}` } key={`${day}.${month}.${year}`} />)
        }
        articles.push(<Article key={article.Id} {...article} />);
        prevDay = day
    }
    return <div className={"group"}>
        <ul>{articles}</ul>
    </div>
};

export default ArticleList;