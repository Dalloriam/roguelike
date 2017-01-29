import { Component, IEvent } from "../engine";

import PlayerInputStore from "../player_input_store";

export class GetMovement implements IEvent {
    ID = "GetMovement";
    movement: Direction;
}

export interface KeyConfig {
    MOVEMENT_LEFT: string,
    MOVEMENT_DOWN: string,
    MOVEMENT_UP: string,
    MOVEMENT_RIGHT: string
}

export enum Direction {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
}

export class PlayerControl extends Component {
    Name = "player_control";

    // TODO: Move hardcoded keys to config
    private keys: KeyConfig = {
        MOVEMENT_LEFT: "h",
        MOVEMENT_DOWN: "j",
        MOVEMENT_UP: "k",
        MOVEMENT_RIGHT: "l"
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
        }
        return evt
    }
}