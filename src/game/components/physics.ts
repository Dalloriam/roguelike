import { IEvent, Component, GameObject } from "../engine";

import { PositionChange } from "./position";

export class GetBlocking implements IEvent {
    ID = "GetBlocking";
    isBlocking: boolean;

    constructor() {
        this.isBlocking = false;
    }
}


export class Physics extends  Component {

    isBlocking: boolean;

    constructor(isBlocking: boolean) {
        super();
        this.isBlocking = isBlocking;
        this.addHandler("GetBlocking", this.onGetBlocking, 100);
    }

    onGetBlocking(e: IEvent): IEvent | boolean {
        let evt = e as GetBlocking;

        evt.isBlocking = this.isBlocking;

        return evt;
    }
}