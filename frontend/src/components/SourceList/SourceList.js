import React from "react";
import "./SourceList.css";
import {Icon} from "../Article/article"

const Source = (props) => {
    return <a href={props.WebSite}><Icon link={props.WebSite} /> {props.Name}</a>
};

class SourceList extends React.Component {
    api = "/sources?name=";

    constructor(props) {
        super(props);

        this.state = {
            sources: [], // TODO do it without state
        };
    }

    componentDidMount(props) {
        fetch(this.api + this.props.name)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(
                        {sources: result}
                    );
                },
                (error) => {
                    console.error(error)
                }
            );
    }

    render() {
        let sources = this.state.sources.map((source) => <Source key={source.Id} {...source} />);
        return <div className={"source-list"}>{sources}</div>
    }
}

export default SourceList;