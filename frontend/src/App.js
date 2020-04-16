import React from 'react';
import './App.css';

import MenuItem from "./components/MenuItem/menuItem";
import {Divider, Logo, Main, Sidebar} from "./components/Layout/layout";
import ArticleList from "./components/ArticleList/articleList";
import SourceList from "./components/SourceList/SourceList";

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
            active: topics[0].name,
            articles: [],
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

    changeTopic(topicName) {
        this.setState({active: topicName}, this.fetchArticles);
    }

    componentDidMount() {
        this.fetchArticles(topics[0].name)
    }

    render() {
        let Menu = [];

        for (let item of topics) {
            let menuItem = <MenuItem key={item.name} active={this.state.active === item.name} name={item.name}
                                     img={item.img}
                                     onClick={() => { this.changeTopic(item.name) }}/>;
            Menu.push(menuItem);
        }

        return (
            <div className="app">
                <Sidebar>
                    <Logo/>
                    {Menu}
                </Sidebar>
                <Main>
                    <ArticleList articlies={this.state.articles}/>
                    <Divider maxWidth={"10%"}/>
                    <SourceList name={this.state.active}/>
                </Main>
            </div>
        );
    }
}


export default App;
