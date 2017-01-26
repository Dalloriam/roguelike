import Tile from "./tile";

import { GameObject } from "./engine";

import { ISystem, DisplaySystem } from  "./systems";

export default class World {
    sizeX: number;
    sizeY: number;
    tileSize: number;

    private objects: Array<GameObject>;
    private map: Tile[][]
    private systems: Array<ISystem>;

    ctx: CanvasRenderingContext2D;

    constructor(sizeX: number, sizeY: number, tileSize: number, ctx: CanvasRenderingContext2D) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.tileSize = tileSize;

        this.ctx = ctx;

        this.objects = [];
        this.systems = [
            new DisplaySystem(this)
        ];

        this.map = [];

        for (let i = 0; i < sizeX; i++) {
            let row: Array<Tile> = [];

            for (let j = 0; j < sizeY; j++) {
                let char = j == 0 || i == 0 || i == sizeX - 1 || j == sizeY - 1? "#": "";
                row.push(new Tile("white", "black", char))
            }
            this.map.push(row);
        }
    }

    getGameObjects(): Array<GameObject> {
        return this.objects;
    }

    getObject(objId: number): GameObject {
        for(let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].ID == objId) {
                return this.objects[i];
            }
        }
    }

    addObject(obj: GameObject) {
        this.objects.push(obj);
    }

    removeObject(objId: number) {
        for(let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].ID == objId) {
                this.objects.splice(i, 1);
            }
        }
    }

    getTile(x: number, y: number): Tile {
        return this.map[x][y];
    }

    tick() {
        this.systems.forEach((s) => {
            s.Update();
        });
    }
} 