import { GameObject, Component } from "../engine";

import { Render, Position, Physics, PlayerControl } from "../components";


export class Player extends GameObject {

    constructor() {
        super("Player");

        [
            new PlayerControl(),
            new Position(),
            new Physics(true),
            new Render("@", "white", "black")
        ].forEach((c: Component) => this.addComponent(c, false))
    }
}