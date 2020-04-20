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
import ideaIcon from "./assets/idea.svg";
import entertamentIcon from "./assets/cinema.svg";
import lobbyIcon from "./assets/lobby.svg";
import russiaIcon from "./assets/Russia.svg";
import workIcon from "./assets/work.svg";
import peopleIcon from "./assets/people.svg";
import vikingIcon from "./assets/viking.svg";
import Menu from "./components/Menu/menu";


let topics = [
    {name: "Технологии (News)", img: techNewsIcon, desc: "Latest news in tech world from aggregators"},
    {name: "Компании", img: workIcon, desc: "Tech blogs from companies "},
    {name: "Люди", img: peopleIcon, desc: "People blogs"},
    {name: "Science", img: scienceIcon, desc: "Science articles"},
    {name: "Технологии (English)", img: techEnglishIcon, desc: "Tech articles in english"},
    {name: "Технологии (Russian)", img: techRussianIcon, desc: "Tech articles in russian"},
    {name: "Idea", img: ideaIcon, desc: "Start ups and pets projects"},
    {name: "Trips", img: tripIcon, desc: "Travel news"},
    {name: "Entertainment", img: entertamentIcon, desc: "News about films and games"},
    {name: "Russia", img: russiaIcon, desc: "Russian news"},
    {name: "Iceland", img: vikingIcon, desc: "Iceland news and official statements"},
    {name: "Lobby", img: lobbyIcon, desc: "Unorganized topics"},
];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: topics[0],
            articles: [],
            sources: [],
        };
    }

    fetchArticles() {
        let api = "/topic?name=";
        fetch(api + this.state.active.name)
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
        fetch(api + this.state.active.name)
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

    changeTopic(topic) {
        this.setState({active: topic}, () => {
            this.fetchArticles();
            this.fetchSources();
        });
    }

    componentDidMount() {
        let initialTopic = topics[0];
        this.changeTopic(initialTopic);
    }

    render() {
        return (
            <div className="app">
                <Sidebar>
                    <Logo />
                    <Menu topics={topics} active={this.state.active.name} callback={(topic) => {this.changeTopic(topic)}} />
                </Sidebar>
                <Main>
                    <ArticleList articlies={this.state.articles}/>
                    <SourceList sources={this.state.sources} desc={this.state.active.desc}/>
                </Main>
                <Footer>
                    <About />
                </Footer>
            </div>
        );
    }
}


export default App;
