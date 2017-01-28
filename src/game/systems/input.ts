import World from "../world";

import { ISystem } from "./ISystem";

import { GameObject } from "../engine";

import { PositionChange } from "../components/position";

import PlayerInputStore from "../player_input_store";

export interface KeyConfig {
    MOVEMENT_LEFT: string,
    MOVEMENT_DOWN: string,
    MOVEMENT_UP: string,
    MOVEMENT_RIGHT: string
}

export class InputSystem implements ISystem {

    private world: World;

    constructor(w: World) {
        this.world = w;
    }

    // TODO: Move hardcoded keys to config
    private keys: KeyConfig = {
        MOVEMENT_LEFT: "h",
        MOVEMENT_DOWN: "j",
        MOVEMENT_UP: "k",
        MOVEMENT_RIGHT: "l"
    }

    Update() {

        // Get pressed key from player input store
        let pressedKey = PlayerInputStore.getKey();

        if (pressedKey == this.keys.MOVEMENT_UP || pressedKey == this.keys.MOVEMENT_DOWN || pressedKey == this.keys.MOVEMENT_LEFT || pressedKey == this.keys.MOVEMENT_RIGHT) {
            // Movement
            let dX: number;
            let dY: number;

            switch(pressedKey) {
                case this.keys.MOVEMENT_UP:
                    dX = 0;
                    dY = -1;
                    break;
                case this.keys.MOVEMENT_DOWN:
                    dX = 0;
                    dY = 1;
                    break;
                case this.keys.MOVEMENT_RIGHT:
                    dX = 1;
                    dY = 0;
                    break;
                case this.keys.MOVEMENT_LEFT:
                    dX = -1;
                    dY = 0;
                    break;
            }

            this.world.getGameObjects().filter((obj) => obj.hasComponent("player_control") && obj.hasComponent("position")).forEach((obj) => {
                obj.emit(new PositionChange(dX, dY));
            })
        }
    }
}

