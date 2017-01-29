import { IEvent, Component } from "../engine";
import * as Events from "../events";

export class Physics extends Component {

    Name = "physics";

    isBlocking: boolean;

    isSeeThrough: boolean;

    detectableChance: number;

    constructor(isBlocking: boolean, detectableChance: number, isSeeThrough=true) {
        super();
        this.isBlocking = isBlocking;
        this.isSeeThrough = isSeeThrough;
        this.addHandler("GetBlocking", this.onGetBlocking, 100);
        this.addHandler("GetDetectableChance", this.onGetDetectableChance, 100);
        this.addHandler("GetSeeThrough", this.onGetSeeThrough, 100);
    }

    onGetSeeThrough(e: IEvent): IEvent | boolean {
        let evt = e as Events.GetSeeThrough;
        evt.isSeeThrough = this.isSeeThrough;
        return evt;
    }

    onGetBlocking(e: IEvent): IEvent | boolean {
        let evt = e as Events.GetBlocking;

        evt.isBlocking = this.isBlocking;

        return evt;
    }

    onGetDetectableChance(e: IEvent): IEvent | boolean {
        let evt = e as Events.GetDetectableChance;

        evt.detectableChance = this.detectableChance;

        return evt;
    }
}