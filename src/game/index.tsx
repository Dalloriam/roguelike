import * as React from "react";

import { GameObject } from "./engine";

import  { Render, Position } from "./components";
import { ChangePosition } from "./components/position";

import World from "./world";

export interface IGameProps {
};

export interface IGameState {
    screen?: {
        height: number,
        width: number,
        ratio: number
    }

    inGame?: boolean,

    context?: CanvasRenderingContext2D,

    world?: World
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
            inGame: false,
        }
    }

    refs: {
        canvas: (HTMLCanvasElement);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress.bind(this, true));

        const context = this.refs.canvas.getContext("2d");
        this.setState({
            context: context,
            inGame: true
        });

        var w = new World(20, 20, 30, context);
        w.addObject(
            new GameObject("Player", [
                new Render("@", "white", "black"),
                new Position(10, 10)
            ])
        );

        this.setState({
            world: w
        });
        w.tick();
    }

    handleKeyPress(value: boolean, e: KeyboardEvent): any {
        switch(e.key) {
        case "h":
            console.log("Going left!");
            break;
        case "j":
            console.log("Going down!");
            break;
        case "k":
            console.log("Going up!");
            break;
        case "l":
            console.log("Going right!");
            break;
        }

        if (this.state.inGame) {
            this.state.world.tick();
        }
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
