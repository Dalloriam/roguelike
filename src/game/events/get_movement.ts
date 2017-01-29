import { IEvent } from "../engine";

import { Direction } from "../direction";

export class GetMovement implements IEvent {
    ID = "GetMovement";
    movement: Direction;
}