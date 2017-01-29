import { IEvent } from "../engine";

export class GetBlocking implements IEvent {
    ID = "GetBlocking";
    isBlocking: boolean;

    constructor() {
        this.isBlocking = false;
    }
}