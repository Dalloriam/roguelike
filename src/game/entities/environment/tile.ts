import { GameObject } from "../../engine";

import { Render, Position, Physics } from "../../components";


export class Tile extends GameObject {
    constructor(name: string, char: string, fg: string, bg: string, x: number, y: number, blocking: boolean) {
        super(name);
        this.addComponent(new Position(x, y), false);
        this.addComponent(new Physics(blocking), false);
        this.addComponent(new Render(char, fg, bg), false);
    }
}