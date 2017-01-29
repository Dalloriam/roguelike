import { Tile } from "./tile";

export class Floor extends Tile {

    constructor(x: number, y: number) {
        super("FloorTile", ".", "#FFFFFF", "#000000", x, y, false, true);
    }
}