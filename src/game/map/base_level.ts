import { GameObject } from "../engine";

export abstract class BaseLevel {

    mapWidth: number;
    mapHeight: number;

    tiles: Array<GameObject>;
    tilesMap: GameObject[][];
    type: string
    seed: string;

    constructor(mapWidth: number, mapHeight: number, type: string, seed: string) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.type = type;
        this.seed = seed;

        this.tiles = [];
        this.tilesMap = [];
    }

    abstract generate(): void;

}