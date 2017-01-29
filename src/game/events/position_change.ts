import { IEvent } from "../engine";

export class PositionChange implements IEvent {
    ID = "PositionChange";

    dX: number;
    dY: number;

    constructor(dx: number, dy: number) {
        this.dX = dx;
        this.dY = dy;
    }
}