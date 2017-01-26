import World from "../world";

import { ISystem } from "./ISystem";

import { GameObject } from "../engine";

export class DisplaySystem implements ISystem {

    private world: World;

    constructor(w: World) {
        this.world = w;
    }

    Update() {
        this.world.getGameObjects().filter((o) => o.hasComponent("render")).forEach((o) => {
            // TODO: Map object rendering logic here
        });
    }
}