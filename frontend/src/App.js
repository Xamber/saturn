import React from 'react';
import './App.css';

import MenuItem from "./components/MenuItem/menuItem";
import View from "./components/View/view";
import Page from "./consts/page"
import {Logo, Main, Sidebar} from "./components/Layout/layout";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: Page[0].name,
        };
    }

    render() {
        let Menu = [];
        let Views = [];

        for (const item of Page) {
            let menuItem = <MenuItem key={item.name} active={this.state.active === item.name} name={item.name} img={item.img}
                                     onClick={() => {
                                         this.setState({active: item.name})
                                     }}/>;
            let viewItem = <View key={item.name} active={this.state.active} name={item.name} view={item.view}/>;

            Menu.push(menuItem);
            Views.push(viewItem);
        }


        return (
            <div className="app">
                <Sidebar>
                    <Logo/>
                    {Menu}
                </Sidebar>
                <Main>
                    {Views}
                </Main>
            </div>
        );
    }
}


export default App;
