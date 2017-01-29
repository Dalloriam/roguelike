import World from "../world";

import { System } from "./system";

import { GameObject } from "../engine";

import { Render, Position } from "../components";

import * as Events from "../events";

export class DisplaySystem extends System {

    private rayMap: boolean[][];
    private memoryMap: boolean[][];

    private rayCount: number;
    private rayStep: number;

    private darkenPercent: number;

    constructor(w: World) {
        super(w);

        this.rayCount = 360;
        this.rayStep = 3;

        this.darkenPercent = -0.65;
    }

    private shade(color: string, percent: number): string {
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
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

    private canSee(xCam: number, yCam: number, object: GameObject): boolean {
        let blocked = true;

        for (let i = 0; i < 1; i += 0.05) {

        }

        return blocked;
    }

    private computeLOS() {
        // Reset Ray map & memory map
        this.rayMap = [];
        this.memoryMap = [];
        for(let i = 0; i < this.world.sizeX; i++) {
            let rrow = [];
            let mrow = [];
            for (let j = 0; j < this.world.sizeY; j++) {
                rrow.push(false);
                mrow.push(false);
            }
            this.rayMap.push(rrow);
            this.memoryMap.push(mrow);
        }

        this.world.objects.filter((obj) => obj.hasComponent("camera") && obj.hasComponent("position")).forEach((cam) => {
            let camPos = cam.emit(new Events.GetPosition()) as Events.GetPosition;
            let camX = camPos.X;
            let camY = camPos.Y;

            let camRadius = (cam.emit(new Events.GetSightRadius()) as Events.GetSightRadius).sightRadius;

            // The camera always sees itself
            this.rayMap[camX][camY] = true;

            for (let i = 0; i <= this.rayCount; i+=this.rayStep) {
                let ax = Math.cos(i / (180 / Math.PI));
                let ay = Math.sin(i / (180 / Math.PI));

                let x = camX;
                let y = camY;

                for (let z = 0; z < camRadius; z ++) {
                    x += ax;
                    y += ay;

                    // Check if (x, y) is out of range
                    if (x < 0 || y < 0 || x >= this.world.sizeX || y >= this.world.sizeY) {
                        break;
                    }

                    // If we reached here, the current tile is visible.
                    this.rayMap[Math.round(x)][Math.round(y)] = true;

                    cam.emit(new Events.AddTileMemory(Math.round(x), Math.round(y)));

                    // However, if the current tile blocks sight, stop raytracing.
                    let currentTile = this.world.mapCoords[Math.round(x)][Math.round(y)];
                    let isSeeThrough = currentTile.emit(new Events.GetSeeThrough()) as Events.GetSeeThrough;

                    if (isSeeThrough && !isSeeThrough.isSeeThrough) {
                        break;
                    }
                }
            }

            if (cam.hasComponent("map_memory")) {
                for( let i = 0; i < this.world.sizeX; i++) {
                    for (let j = 0; j < this.world.sizeY; j++) {
                        if (!this.rayMap[i][j]) {
                            // Check if the camera has it in memory
                            let isMem = (cam.emit(new Events.GetTileMemory(i, j)) as Events.GetTileMemory).tileInMemory;

                            if (isMem) {
                                this.memoryMap[i][j] = true;
                            }
                        }
                    }
                }
            }

        });
    }

    private drawObjects(objs: Array<GameObject>) {

        this.computeLOS();

        objs.forEach((obj) => {

            // If obj is in FOV of cam, render fully
            let r = obj.emit(new Events.GetRenderInfo()) as Events.GetRenderInfo;
            let p = obj.emit(new Events.GetPosition()) as Events.GetPosition;

            if (this.rayMap[p.X][p.Y]) {
                this.drawTile(p.X, p.Y, r.char, r.charBg, r.charFg);
            } else if (this.memoryMap[p.X][p.Y]) {
                this.drawTile(p.X, p.Y, r.char, this.shade(r.charBg, this.darkenPercent), this.shade(r.charFg, this.darkenPercent));
            }

        });

    }

    Update() {
        const ctx = this.world.ctx;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawObjects(this.world.map.filter((o) => o.hasComponent("render") && o.hasComponent("position")));
        this.drawObjects(this.world.objects.filter((o) => o.hasComponent("render") && o.hasComponent("position")))
    }
}