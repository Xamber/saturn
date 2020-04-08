import React from "react";
import Topic from "./../components/topic";
import About from "../components/About/about";

import scienceIcon from "./../assets/science.svg";
import tripIcon from "./../assets/plane.svg";
import techNewsIcon from "./../assets/radio.svg";
import techJournalIcon from "./../assets/idea.svg";
import russiaIcon from "./../assets/Russia.svg";
import workIcon from "./../assets/work.svg";
import peopleIcon from "./../assets/people.svg";
import vikingIcon from "./../assets/viking.svg";
import aboutIcon from "./../assets/question.svg";


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

let techjournal = {
    name: "Technology Journal",
    img: techJournalIcon,
    view: <Topic name={"Технологии (Magazine)"}/>
};

let russia = {
    name: "Russian Articles",
    img: russiaIcon,
    view: <Topic name={"Journal"}/>
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

let about = {
    name: "About",
    img: aboutIcon,
    view: <About/>
};


const Page = [technews, companies, science, trips, people, techjournal, russia, iceland, about];

export default Page;