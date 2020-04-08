import React from "react";
import Article from "../Article/article";

import "./articleList.css"

const ArticleList = (props) => {
    const articles = props.articlies.map((article) => <Article {...article} />);
    return <div className={"group"}>
        <ul>{articles}</ul>
    </div>
};

export default ArticleList;