import { IEvent, Component } from "../engine";
import { GetSightRadius } from "../events";

export class Camera extends Component {
    Name = "camera";

    sightRadius: number;

    constructor(radius: number) {
        super()
        this.sightRadius = radius;

        this.addHandler("GetSightRadius", this.onGetSightRadius, 100);
    }

    onGetSightRadius(e: IEvent): IEvent | boolean {
        let evt = e as GetSightRadius;

        evt.sightRadius = this.sightRadius;

        return evt
    }
}