import { GameObject, Component } from "../engine";

import { Render, Position, Physics, PlayerControl, Camera } from "../components";


export class Player extends GameObject {

    constructor() {
        super("Player");

        [
            new PlayerControl(),
            new Position(),
            new Physics(true, 0.8),
            new Camera(10),
            new Render("@", "white", "black")
        ].forEach((c: Component) => this.addComponent(c, false))
    }
}