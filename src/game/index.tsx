import * as React from "react";

import PlayerInputStore from "./player_input_store";

import * as Entities from "./entities";
import * as Events from "./events";

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
        canvasContainer: (HTMLElement);
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

        // TODO: Generate random map
        let xSize = 80;
        let ySize = 40;
        var w = new World(xSize, ySize, Math.floor(this.refs.canvasContainer.clientWidth * 0.9 / xSize), context);
        
        let player = new Entities.Player();

        // TODO: Set player position dynamically
        player.emit(new Events.SetPosition(10, 10));
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
            <div ref="canvasContainer">
            <canvas ref="canvas" 
                width={ this.state.screen.width * this.state.screen.ratio }
                height={ this.state.screen.height * this.state.screen.ratio }
            />
        </div>
        )

    }
}
