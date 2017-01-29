import { IEvent } from "../engine";

export class GetPosition implements IEvent {
    ID = "GetPosition";

    X: number;
    Y: number;
}