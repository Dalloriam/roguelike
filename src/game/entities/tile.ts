import { GameObject } from "../engine";

import { Render, Position } from "../components";


export default class Tile extends GameObject {
    constructor(char: string, fg: string, bg: string, x: number, y: number) {
        super("Tile");
        this.addComponent(new Position(x, y), false);
        this.addComponent(new Render(char, fg, bg), false);
    }
}