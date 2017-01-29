import { IEvent, Component, GameObject } from "../engine";
import * as Events from "../events";

interface SingleTile {
    X: number;
    Y: number;
}

export class MapMemory extends Component {
    Name = "map_memory";

    private tileMemory: SingleTile[];

    constructor() {
        super();

        this.tileMemory = [];

        this.addHandler("GetTileMemory", this.onGetTileMemory, 100);
        this.addHandler("AddTileMemory", this.onAddTileMemory, 100);
    }

    private hasTile(x: number, y: number) {
        return this.tileMemory.filter((t) => t.X == x && t.Y == y).length == 1;
    }

    onAddTileMemory(e: IEvent): IEvent | boolean {
        let evt = e as Events.AddTileMemory;

        if (!this.hasTile(evt.X, evt.Y)) {
            this.tileMemory.push({X: evt.X, Y: evt.Y});
        }

        return evt;
    }

    onGetTileMemory(e: IEvent): IEvent | boolean {
        let evt = e as Events.GetTileMemory;

        evt.tileInMemory = this.tileMemory.filter((t) => t.X == evt.X && t.Y == evt.Y).length == 1;

        return evt;
    }
}