import React from "react";
import ArticleList from "../ArticleList/articleList";
import SourceList from "../SourceList/SourceList";
import {Divider} from "../Layout/layout";


class Topic extends React.Component {
    // this endpoint should be changed to the topic
    api = "/topic?name=";

    constructor(props) {
        super(props);

        this.state = {
            articles: [], // Doing with state because of the future auto-update
        };
    }

    componentDidMount(props) {
        fetch(this.api + this.props.name)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(
                        {articles: result}
                    );
                },
                (error) => {
                    console.error(error)
                }
            );
    }

    render() {
        return <div>
            <ArticleList articlies={this.state.articles}/>
            <Divider maxWidth={"10%"}/>
            <SourceList name={this.props.name}/>
        </div>
    }
}

export default Topic;