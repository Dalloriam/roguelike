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
        return <h1>Roguelike!</h1>
    }
}
