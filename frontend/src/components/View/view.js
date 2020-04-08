import React from "react";

function View(props) {
    let className = props.active !== props.name ? "hidden" : "showed";
    return <section className={"view"} className={className}>
        {props.view}
    </section>
}

export default View;