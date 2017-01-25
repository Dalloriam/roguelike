import * as React from "react";

import Game from "../game";

export interface IHomeProps {}

export interface IHomeState {}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <Game></Game>
        );
    }
}
