import Tile from "./tile";

import { GameObject } from "./engine";

import { ISystem, DisplaySystem } from  "./systems";

export default class World {
    sizeX: number;
    sizeY: number;

    private objects: Array<GameObject>;
    private map: Tile[][]
    private systems: Array<ISystem>;

    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.objects = [];

        this.systems = [
            new DisplaySystem(this)
        ];
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