import { GameObject } from "../engine";

export class BaseLevel {

    mapWidth: number;
    mapHeight: number;

    tiles: Array<GameObject>;
    tilesMap: GameObject[][];
    type: string
    seed: number;

    playerX: number;
    playerY: number;

    constructor(mapWidth: number, mapHeight: number, seed: number) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.seed = seed;

        this.tiles = [];
        this.tilesMap = [];
    }

     generate(): void {

     }

}