import React from "react";


const Menu = function (props) {
    let menu = [];
    for (let item of props.topics) {
        let activeClass = props.active === item.name ? "active" : "passive";
        let callback = () => {props.callback.apply(null, [item])};

        let menuItem = <div key={item.name} className={activeClass} onClick={callback}>
            <img className="icon" alt={item.name} src={item.img}/>
        </div>;
        menu.push(menuItem);
    }
    return menu
};

export default Menu;



