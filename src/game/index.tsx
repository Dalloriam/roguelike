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
    }

    refs: {
        canvas: (HTMLCanvasElement);
    }

    componentDidMount() {
        const context = this.refs.canvas.getContext("2d");
        this.setState({
            context: context
        });
        let w = new World(20, 20, 30, context);
        w.addObject(
            new GameObject("Player", [
                new Render("@", "white", "black"),
                new Position(10, 10)
            ])
        )
        w.tick();
        setTimeout(() => {
            w.getObject(0).FireEvent(new ChangePosition(2, 2));
            w.tick();
        }, 5000)
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
