import World from "../world";

import { ISystem } from "./ISystem";

import { GameObject } from "../engine";

import { Render, Position } from "../components";

import { GetRenderInfo, GetPosition } from "../events";

export class DisplaySystem implements ISystem {

    private world: World;

    constructor(w: World) {
        this.world = w;
    }

    private drawTile(x: number, y: number, char: string, bgColor: string, fgColor: string) {
        const ctx = this.world.ctx;
        const tileSize = this.world.tileSize;

        ctx.fillStyle = bgColor;
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        ctx.fillStyle = fgColor;
        ctx.font = "12pt serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(char, (x * tileSize) + (tileSize / 2), (y * tileSize) + (tileSize / 2), tileSize / 2);
    }

    private drawObjects(objs: Array<GameObject>) {
        objs.forEach((obj) => {
            let r = obj.emit(new GetRenderInfo()) as GetRenderInfo;
            let p = obj.emit(new GetPosition()) as GetPosition;

            if (r && p) {
                this.drawTile(p.X, p.Y, r.char, r.charBg, r.charFg);
            }

        });
    }

    Update() {
        const ctx = this.world.ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawObjects(this.world.map);
        this.drawObjects(this.world.getGameObjects().filter((o) => o.hasComponent("render") && o.hasComponent("position")))
    }
}