import { GameObject } from "./engine";

import { System, DisplaySystem, MovementSystem } from  "./systems";

import { GenerateLevel, BaseLevel } from "./map";

export default class World {
    sizeX: number;
    sizeY: number;
    tileSize: number;

    objects: Array<GameObject>;
    map: BaseLevel;
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

        this.map = GenerateLevel(sizeX, sizeY);
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