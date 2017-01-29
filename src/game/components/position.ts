import { Component, IEvent } from "../engine";

import { PositionChange, GetPosition, SetPosition } from "../events";

export class Position extends Component {

    Name = "position";

    X: number;
    Y: number;

    constructor(X?: number, Y?: number) {
        super();

        this.X = X;
        this.Y = Y;

        this.addHandler("PositionChange", this.OnPositionChange, 100);
        this.addHandler("SetPosition", this.onSetPosition, 100);
        this.addHandler("GetPosition", this.OnGetPosition, 100);
    }

    onSetPosition(e: IEvent): boolean | IEvent {
        let evt = e as SetPosition;

        this.X = evt.X;
        this.Y = evt.Y;

        return evt;
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