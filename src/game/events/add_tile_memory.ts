import { IEvent } from "../engine";

export class AddTileMemory implements IEvent {
    ID = "AddTileMemory";

    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}