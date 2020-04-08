import React from "react";
import "./about.css";

const Russian = () => <div>
    <img src="https://image.flaticon.com/icons/svg/323/323300.svg" alt=""/>
    <h3>Что это за сайт тут такой?</h3>
    <p>
        Это сайт который я состряпал, чтобы читать разные новости из RSS в приятной мне форме. <br/>
        Это очень удобно, когда можно добавить разного рода функционал чисто под себя.
    </p>

    <h3>Это ты придумал?</h3>
    <p>Идея не моя, я подсмотрел ее у Вастрика (<a href="https://infomate.club/what/">infomate.club</a>). <br/>
            Если честно и большинство RSS фидов тоже оттуда. <br/>
        Проект же Вастрика, как он сам говорит, был вдохновлен сайтами <a href="nuuz.io">nuuz.io</a> и <a
            href="skimfeed.com">skimfeed.com</a>. <br/>
    </p>


    <h3>Открыт ли код?</h3>
    <p>
        У проекта есть репозиторий, если вдруг что [тут будет репозиторий, когда я его открою].
    </p>
</div>;


const English = () => <div>
        <img src="https://image.flaticon.com/icons/svg/294/294059.svg" alt=""/>
        <h3>What kind of site is this?</h3>
        <p>
            This is a site that I concocted to read various news from RSS in a form that is pleasant to me. <br/>
            This is very convenient when you can add all sorts of functionality purely for yourself.
        </p>

        <h3>Did you come up with this?</h3>
        <p>The idea is not mine, I spied it on Vas3k (<a href="https://infomate.club/what/">infomate.club</a>).
            To be honest, most RSS feeds are also from there. <br/>
            The Vas3k's project, as he himself says, was inspired by the sites <a href="nuuz.io">nuuz.io</a> and <a
                href="skimfeed.com">skimfeed.com</a>. <br/>
        </p>


        <h3>Is the code open?</h3>
        <p>
            The project has a repository, if all of a sudden [there will be a repository when I open it].
        </p>
    </div>
;
const Icelandic = () => <div>
    <img src="https://image.flaticon.com/icons/svg/197/197596.svg" alt=""/>
    <h3>Hvers konar síða er þetta?</h3>
    <p>
        Þetta er síða sem ég smíðaði til að lesa ýmsar fréttir af RSS á formi sem er skemmtilega fyrir mig. <br/>
        Þetta er mjög þægilegt þegar þú getur bætt alls konar virkni eingöngu fyrir sjálfan þig.
    </p>

    <h3>Komstu með þetta?</h3>
    <p>Hugmyndin er ekki mín, ég njósnaði hana á Vas3k (<a href="https://infomate.club/what/">infomate.club</a>). <br/>
        Til að vera heiðarlegur eru flestir RSS straumar þaðan. <br/>
        Vas3ka verkefnið, eins og hann segir sjálfur, var innblásið af vefsíðunum <a href="nuuz.io">nuuz.io</a> og <a
            href="skimfeed.com">skimfeed.com</a>. <br/>
    </p>
    <p>

    </p>

    <h3>Er kóðinn opinn?</h3>
    <p>
        Verkefnið er með geymslu, ef allt í einu [það verður til geymsla þegar ég opna það].
    </p>
</div>;


function About() {
    return <div className={"about"}>
        <Russian/>
        <English/>
        <Icelandic/>
    </div>
}

export default About;