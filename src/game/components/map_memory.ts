import { IEvent, Component, GameObject } from "../engine";
import * as Events from "../events";

export class MapMemory extends Component {
    Name = "map_memory";

    private tileMemory: {[k: number]: number[]};

    constructor() {
        super();

        this.tileMemory = [];

        this.addHandler("GetTileMemory", this.onGetTileMemory, 100);
        this.addHandler("AddTileMemory", this.onAddTileMemory, 100);
    }

    private hasTile(x: number, y: number): boolean {
        if (!(x in this.tileMemory)) {
            return false;
        }

        return this.tileMemory[x].indexOf(y) !== -1;
    }

    onAddTileMemory(e: IEvent): IEvent | boolean {
        let evt = e as Events.AddTileMemory;

        if (!this.hasTile(evt.X, evt.Y)) {
            if (!(evt.X in this.tileMemory)) {
                this.tileMemory[evt.X] = [];
            }
            if (this.tileMemory[evt.X].indexOf(evt.Y) === -1) {
                this.tileMemory[evt.X].push(evt.Y);
            }
        }

        return evt;
    }

    onGetTileMemory(e: IEvent): IEvent | boolean {
        let evt = e as Events.GetTileMemory;

        evt.tileInMemory = this.hasTile(evt.X, evt.Y);

        return evt;
    }
}