import { Component, IEvent } from "../engine";

import { GetMovement } from "../events";

import { Direction } from "../direction";

import PlayerInputStore from "../player_input_store";

export interface KeyConfig {
    MOVEMENT_LEFT: string;
    MOVEMENT_DOWN: string;
    MOVEMENT_UP: string;
    MOVEMENT_RIGHT: string;
    MOVEMENT_DOWN_LEFT: string;
    MOVEMENT_DOWN_RIGHT: string;
    MOVEMENT_UP_LEFT: string;
    MOVEMENT_UP_RIGHT: string;
}

export class PlayerControl extends Component {
    Name = "player_control";

    // TODO: Move hardcoded keys to config
    private keys: KeyConfig = {
        MOVEMENT_LEFT: "h",
        MOVEMENT_DOWN: "j",
        MOVEMENT_UP: "k",
        MOVEMENT_RIGHT: "l",
        MOVEMENT_DOWN_LEFT: "b",
        MOVEMENT_DOWN_RIGHT: "n",
        MOVEMENT_UP_RIGHT: "u",
        MOVEMENT_UP_LEFT: "y"
    }

    constructor() {
        super();

        this.addHandler("GetMovement", this.onGetMovement, 100);
    }

    onGetMovement(e: IEvent): IEvent | boolean {

        let evt = e as GetMovement;

        // Get pressed key from player input store
        let pressedKey = PlayerInputStore.getKey();

        switch(pressedKey) {
            case this.keys.MOVEMENT_DOWN:
                evt.movement = Direction.DOWN;
                break;
            case this.keys.MOVEMENT_UP:
                evt.movement = Direction.UP;
                break;
            case this.keys.MOVEMENT_RIGHT:
                evt.movement = Direction.RIGHT;
                break;
            case this.keys.MOVEMENT_LEFT:
                evt.movement = Direction.LEFT;
                break;
            case this.keys.MOVEMENT_DOWN_LEFT:
                evt.movement = Direction.DOWN_LEFT;
                break;
            case this.keys.MOVEMENT_DOWN_RIGHT:
                evt.movement = Direction.DOWN_RIGHT;
                break;
            case this.keys.MOVEMENT_UP_LEFT:
                evt.movement = Direction.UP_LEFT;
                break;
            case this.keys.MOVEMENT_UP_RIGHT:
                evt.movement = Direction.UP_RIGHT;
                break;
        }
        return evt
    }
}