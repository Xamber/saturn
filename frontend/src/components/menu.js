import React from "react";

function MenuItem(props) {
    return <div className={props.active ? "active" : "passive"} onClick={props.onClick}>
        <img className="icon"
             alt={props.name}
             src={props.img}
        />
    </div>;
}

export default MenuItem;