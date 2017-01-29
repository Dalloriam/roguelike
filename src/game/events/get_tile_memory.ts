import { IEvent } from "../engine";

export class GetTileMemory implements IEvent {
    ID = "GetTileMemory";
    tileInMemory: boolean;

    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.tileInMemory = false;
        this.X = x;
        this.Y = y;
    }
}