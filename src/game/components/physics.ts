import { IEvent, Component, GameObject } from "../engine";

import { GetBlocking } from "../events";

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