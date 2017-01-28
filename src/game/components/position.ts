import { Component, IEvent } from "../engine";

export class PositionChange implements IEvent {
    ID = "PositionChange";

    dX: number;
    dY: number;

    constructor(dx: number, dy: number) {
        this.dX = dx;
        this.dY = dy;
    }
}

export class GetPosition implements IEvent {
    ID = "GetPosition";

    X: number;
    Y: number;
}

export class Position extends Component {

    Name = "position";

    X: number;
    Y: number;

    constructor(x: number, y: number) {
        super();

        this.X = x;
        this.Y = y;

        this.addHandler("PositionChange", this.OnPositionChange, 100);
        this.addHandler("GetPosition", this.OnGetPosition, 100);
    }

    public OnPositionChange(e: IEvent): boolean | IEvent {
        let evt = e as PositionChange;

        this.X += evt.dX;
        this.Y += evt.dY;

        return evt;
    }

    public OnGetPosition(e: IEvent): boolean | IEvent {
        let evt = e as GetPosition;

        evt.X = this.X; 
        evt.Y = this.Y;

        return evt;
    }
}