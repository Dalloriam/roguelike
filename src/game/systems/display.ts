import World from "../world";

import { ISystem } from "./ISystem";

import { GameObject } from "../engine";

import { Render, Position } from "../components";

import Tile from "../tile";

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

    private drawMap() {
        const world = this.world;
        const ctx = world.ctx;

        const tileSize = world.tileSize;
        const sizeX = world.sizeX;
        const sizeY = world.sizeY;

        ctx.clearRect(0, 0, sizeX * tileSize, sizeY * tileSize);

        for (let x = 0; x < sizeX; x++) {
            for (let y = 0; y < sizeY; y++) {
                let t = world.getTile(x, y);
                this.drawTile(x, y, t.char, t.bgColor, t.fgColor);
            }
        }
    }

    Update() {
        const ctx = this.world.ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawMap();

        this.world.getGameObjects().filter((o) => o.hasComponent("render") && o.hasComponent("position")).forEach((o) => {
            let r = o.getComponent("render") as Render;
            let p = o.getComponent("position") as Position;

            // First, draw map tile (because we want to leave default bg or fg if render doesnt specify it)
            this.drawTile(p.X, p.Y, r.Char, r.CharBg, r.CharFg);
        });
    }
}