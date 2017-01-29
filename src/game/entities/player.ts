import { GameObject, Component } from "../engine";

import { Render, Position, Physics, PlayerControl, Camera, MapMemory } from "../components";


export class Player extends GameObject {

    constructor() {
        super("Player");

        [
            new PlayerControl(),
            new Position(),
            new Physics(true, 0.8),
            new Camera(8),
            new MapMemory(),
            new Render("@", "#FFFFFF", "#000000")
        ].forEach((c: Component) => this.addComponent(c, false))
    }
}