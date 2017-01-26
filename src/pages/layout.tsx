import * as React from "react";
import {Link} from "react-router"


export interface ILayoutProps {}

export interface ILayoutState {
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Roguelike Test</h1>
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}
