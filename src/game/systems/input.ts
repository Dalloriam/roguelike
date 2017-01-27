import World from "../world";

import { ISystem } from "./ISystem";

import { GameObject } from "../engine";

export class InputSystem implements ISystem {

    private world: World;

    constructor(w: World) {
        this.world = w;
        this.world.ctx.
    }

    Update() {
        this.world.getGameObjects().filter((x) => {
        });
    }
}

