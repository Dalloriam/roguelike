import * as React from "react";

import { GameObject } from "./engine";

import PlayerInputStore from "./player_input_store";

import  { Render, Position, PlayerControl, Physics } from "./components";

import { CreateKeyPressReceivedAction } from "./actions/key_press";

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

    componentWillMount() {
        PlayerInputStore.on("tick", this.tick.bind(this));
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress.bind(this, true));

        const context = this.refs.canvas.getContext("2d");

        this.setState({
            context: context,
            inGame: true
        });

        // Hardcode game workd (TODO: chang this)
        var w = new World(20, 20, 30, context);
        
        // Hardcode player (TODO: Remove this)
        let player = new GameObject("Player");
        player.addComponent(new PlayerControl(), false);
        player.addComponent(new Position(10, 10), false);
        player.addComponent(new Physics(true), false);
        player.addComponent(new Render("@", "white", "black"), false);

        w.addObject(player);

        this.setState({
            world: w
        });

        w.tick();
    }

    componentWillUnmount() {
        PlayerInputStore.removeListener("tick", this.tick);
    }

    tick() {
        if (this.state.inGame) {
            this.state.world.tick();
        }
    }

    handleKeyPress(value: boolean, e: KeyboardEvent): any {
        CreateKeyPressReceivedAction(e.key);
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
