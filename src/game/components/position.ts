import { IComponent, IEvent } from "../engine";

export class ChangePosition implements IEvent {
    ID = "ChangePosition";

    dX: number;
    dY: number;

    constructor(dx: number, dy: number) {
        this.dX = dx;
        this.dY = dy;
    }
}

export class Position implements IComponent {

    Name = "position";

    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    FireEvent(e: IEvent): boolean {
        switch (e.ID) {
            case "ChangePosition":
                let evt = e as ChangePosition;
                this.X += evt.dX;
                this.Y += evt.dY;
        }
        return false;
    }

}