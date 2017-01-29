import { GameObject } from "../engine";

import World from "../world";

export abstract class System {

    protected world: World;

    constructor(w: World) {
        this.world = w;
    }

    abstract Update(): void;
}
