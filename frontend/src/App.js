import React from 'react';
import './App.css';

import {Logo, Main, Sidebar, Footer} from "./components/Layout/layout";
import ArticleList from "./components/ArticleList/articleList";
import SourceList from "./components/SourceList/sourceList";
import About from "./components/About/about";

import scienceIcon from "./assets/science.svg";
import tripIcon from "./assets/plane.svg";
import techNewsIcon from "./assets/radio.svg";
import techEnglishIcon from "./assets/cat.svg";
import techRussianIcon from "./assets/balalaika.svg";
import intertamentIcon from "./assets/cinema.svg";
import lobbyIcon from "./assets/lobby.svg";
import russiaIcon from "./assets/Russia.svg";
import workIcon from "./assets/work.svg";
import peopleIcon from "./assets/people.svg";
import vikingIcon from "./assets/viking.svg";
import Menu from "./components/Menu/menu";


let topics = [
    {name: "Технологии (News)", img: techNewsIcon},
    {name: "Компании", img: workIcon},
    {name: "Люди", img: peopleIcon},
    {name: "Science", img: scienceIcon},
    {name: "Технологии (English)", img: techEnglishIcon},
    {name: "Технологии (Russian)", img: techRussianIcon},
    {name: "Trips", img: tripIcon},
    {name: "Intertaiment", img: intertamentIcon},
    {name: "Russia", img: russiaIcon},
    {name: "Iceland", img: vikingIcon},
    {name: "Lobby", img: lobbyIcon},
];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "",
            articles: [],
            sources: [],
        };
    }

    fetchArticles() {
        let api = "/topic?name=";
        fetch(api + this.state.active)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({articles: result});
                },
                (error) => {
                    console.error(error)
                }
            );
    }

    fetchSources() {
        let api = "/sources?name=";
        fetch(api + this.state.active)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({sources: result});
                },
                (error) => {
                    console.error(error)
                }
            );
    }

    changeTopic(topicName) {
        this.setState({active: topicName}, () => {
            this.fetchArticles();
            this.fetchSources();
        });
    }

    componentDidMount() {
        let initialTopic = topics[0].name;
        this.changeTopic(initialTopic);
    }

    render() {
        return (
            <div className="app">
                <Sidebar>
                    <Logo />
                    <Menu topics={topics} active={this.state.active} callback={(name) => {this.changeTopic(name)}} />
                </Sidebar>
                <Main>
                    <ArticleList articlies={this.state.articles}/>
                    <SourceList sources={this.state.sources}/>
                </Main>
                <Footer>
                    <About />
                </Footer>
            </div>
        );
    }
}


export default App;
