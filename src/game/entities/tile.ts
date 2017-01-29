import { GameObject } from "../engine";

import { Render, Position, Physics } from "../components";


export default class Tile extends GameObject {
    constructor(char: string, fg: string, bg: string, x: number, y: number, blocking: boolean) {
        super("Tile");
        this.addComponent(new Position(x, y), false);
        this.addComponent(new Render(char, fg, bg), false);
        this.addComponent(new Physics(blocking), false);
    }
}