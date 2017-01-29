import { IEvent } from "../engine";

export class SetPosition implements IEvent {
    ID = "SetPosition";

    X: number;
    Y: number;

    constructor(X: number, Y: number) {
        this.X = X;
        this.Y = Y;
    }
}