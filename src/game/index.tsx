import * as React from "react";

import { GameObject } from "./engine";

import  { Render, GetDisplayChar } from "./components/render";

export interface IGameProps {
};

export interface IGameState {
    screen?: {
        height: number,
        width: number,
        ratio: number
    }

    inGame?: boolean

    context?: CanvasRenderingContext2D
};

export default class Game extends React.Component<IGameProps, IGameState> {
    constructor() {
        super()

        this.state = {
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1,
            },
            context: null,
            inGame: false
        }

        this.startGame();
    }

    refs: {
        canvas: (HTMLCanvasElement);
    }

    componentDidMount() {
        const context = this.refs.canvas.getContext("2d");
        this.setState({
            context: context
        });
    }

    startGame() {
        this.setState({
            inGame: true
        });
        let player = new GameObject("Player", [new Render("@", "white", "black")]);
        let evt = new GetDisplayChar();
        player.FireEvent(evt)
        console.log(evt.DisplayChar);
    }

    render() {
        return (
        <div>
            <canvas ref="canvas" 
                width={ this.state.screen.width * this.state.screen.ratio }
                height={ this.state.screen.height * this.state.screen.ratio }
            />
        </div>
        )

    }
}
