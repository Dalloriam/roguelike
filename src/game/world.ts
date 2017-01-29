import { Wall, Floor } from "./entities/environment";

import { GameObject } from "./engine";

import { System, DisplaySystem, MovementSystem } from  "./systems";

export default class World {
    sizeX: number;
    sizeY: number;
    tileSize: number;

    objects: Array<GameObject>;
    map: Array<GameObject>;
    mapCoords: GameObject[][];
    private systems: Array<System>;

    ctx: CanvasRenderingContext2D;

    constructor(sizeX: number, sizeY: number, tileSize: number, ctx: CanvasRenderingContext2D) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.tileSize = tileSize;

        this.ctx = ctx;

        this.objects = [];
        this.systems = [
            new MovementSystem(this),
            new DisplaySystem(this)
        ];

        this.map = [];
        this.mapCoords = [];
        for (let i = 0; i < sizeX; i++) {
            let row = [];
            for (let j = 0; j < sizeY; j++) {
                let tile = j == 0 || i == 0 || i == sizeX - 1 || j == sizeY - 1? Wall: Floor;
                if (i == 4 && j == 4) {
                    tile = Wall;
                }
                let t = new tile(i, j);
                row.push(t);
                this.map.push(t);
            }
            this.mapCoords.push(row);
        }
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

    tick() {
        this.systems.forEach((s) => {
            s.Update();
        });
    }
} 