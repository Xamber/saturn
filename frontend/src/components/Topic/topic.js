import React from "react";
import ArticleList from "../ArticleList/articleList";


class Topic extends React.Component {
    // this endpoint should be changed to the topic
    api = "/group?name=";

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
        return <ArticleList articlies={this.state.articles}/>
    }
}

export default Topic