import { BaseLevel } from "..";
import { GameObject } from "../../engine";

class Rectangle {

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    centerX: number;
    centerY: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;

        this.centerX = (this.x1 + this.x2) / 2;
        this.centerY = (this.y1 + this.y2) / 2;
    }

    intersects(other: Rectangle): boolean {
        return (this.x1 <= other.x2 && this.x2 >= other.x1 && this.y1 <= other.y2 && this.y2 >= other.y1);
    }

}

export class Dungeon extends BaseLevel {

    tiles: Array<GameObject>;
    tilesMap: GameObject[][];
    seed: string;

    constructor(mapWidth: number, mapHeight: number, seed: string) {
        super(mapWidth, mapHeight, "dungeon", seed);
    }

    generate(): void {

    }

}