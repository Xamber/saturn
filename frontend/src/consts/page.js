import React from "react";
import Topic from "../components/Topic/topic";

import scienceIcon from "./../assets/science.svg";
import tripIcon from "./../assets/plane.svg";
import techNewsIcon from "./../assets/radio.svg";
import techEnglishIcon from "./../assets/cat.svg";
import techRussianIcon from "./../assets/balalaika.svg";
import intertamentIcon from "./../assets/cinema.svg";
import lobbyIcon from "./../assets/lobby.svg";
import russiaIcon from "./../assets/Russia.svg";
import workIcon from "./../assets/work.svg";
import peopleIcon from "./../assets/people.svg";
import vikingIcon from "./../assets/viking.svg";


let companies = {
    name: "Companies Blogs",
    img: workIcon,
    view: <Topic name={"Компании"}/>
};

let people = {
    name: "Personal Blogs",
    img: peopleIcon,
    view: <Topic name={"Люди"}/>
};

let technews = {
    name: "Technology News",
    img: techNewsIcon,
    view: <Topic name={"Технологии (News)"}/>
};

let techjournalenglish = {
    name: "Technology Journal - English",
    img: techEnglishIcon,
    view: <Topic name={"Технологии (English)"}/>
};

let techjournalrussian = {
    name: "Technology Journal - Russian",
    img: techRussianIcon,
    view: <Topic name={"Технологии (Russian)"}/>
};

let intertament = {
    name: "Intertaiment",
    img: intertamentIcon,
    view: <Topic name={"Intertaiment"}/>
};

let lobby = {
    name: "Lobby",
    img: lobbyIcon,
    view: <Topic name={"Lobby"}/>
};

let russia = {
    name: "Russian Articles",
    img: russiaIcon,
    view: <Topic name={"Russia"}/>
};

let science = {
    name: "Science",
    img: scienceIcon,
    view: <Topic name={"Science"}/>
};

let trips = {
    name: "Trips",
    img: tripIcon,
    view: <Topic name={"Trips"}/>
};

let iceland = {
    name: "Iceland's News",
    img: vikingIcon,
    view: <Topic name={"Iceland"}/>
};

const Page = [technews, companies, science, trips, people, techjournalenglish, techjournalrussian, intertament, russia, iceland, lobby];

export default Page;