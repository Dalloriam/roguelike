import { Tile } from "./tile";

export class Floor extends Tile {

    constructor(x: number, y: number) {
        super("FloorTile", ".", "white", "black", x, y, false);
    }
}