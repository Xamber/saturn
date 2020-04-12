import React from "react";

function View(props) {
    const classes = `view ${props.active !== props.name ? "hidden" : "showed"}`;

    return <section className={classes}>
        {props.view}
    </section>
}

export default View;