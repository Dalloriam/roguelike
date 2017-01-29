import Tile from "./entities/tile";

import { GameObject } from "./engine";

import { ISystem, DisplaySystem, MovementSystem } from  "./systems";

export default class World {
    sizeX: number;
    sizeY: number;
    tileSize: number;

    private objects: Array<GameObject>;
    map: Array<GameObject>;
    private systems: Array<ISystem>;

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

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                let char = j == 0 || i == 0 || i == sizeX - 1 || j == sizeY - 1? "#": "";
                let blocking = char == "#";
                this.map.push(new Tile(char, "white", "black", i, j, blocking));
            }
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

    tick() {
        this.systems.forEach((s) => {
            s.Update();
        });
    }
} 