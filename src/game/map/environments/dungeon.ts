import { BaseLevel } from "..";
import { GameObject, SeededRandom } from "../../engine";

import * as tiles from "../../entities/environment";

class Rectangle {

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    centerX: number;
    centerY: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;

        this.centerX = Math.round((this.x1 + this.x2) / 2);
        this.centerY = Math.round((this.y1 + this.y2) / 2);
    }

    intersects(other: Rectangle): boolean {
        return (this.x1 <= other.x2 && this.x2 >= other.x1 && this.y1 <= other.y2 && this.y2 >= other.y1);
    }

}

export class Dungeon extends BaseLevel {

    tiles: Array<GameObject>;
    tilesMap: GameObject[][];
    seed: number;

    type = "dungeon";

    private roomMaxSize = 10;
    private roomMinSize = 6;
    private maxRooms = 50;

    constructor(mapWidth: number, mapHeight: number, seed: number) {
        super(mapWidth, mapHeight, seed)

        // Start by filling the map with rock
        for (let i = 0; i < mapWidth; i++) {
            let row: tiles.Tile[] = [];
            for (let j = 0; j < mapHeight; j++) {
                let tile = new tiles.RockWall(i, j);
                row.push(tile);
            }
            this.tilesMap.push(row);
        }

        this.generate();

        this.tilesMap.forEach((row) => {
            row.forEach((tile) => {
                this.tiles.push(tile);
            });
        });
    }

    private digHorizontalTunnel(x1: number, x2: number, y: number): void {
        for (let x = Math.min(x1 , x2); x <= Math.max(x1, x2); x++) {
            this.tilesMap[x][y] = new tiles.Floor(x, y);
        }
    }

    private digVerticalTunnel(y1: number, y2: number, x: number): void {
        for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            this.tilesMap[x][y] = new tiles.Floor(x, y);
        }
    }

    private digRectangle(rect: Rectangle): void {
        for(let i = rect.x1; i <= rect.x2; i++) {
            for (let j = rect.y1; j <= rect.y2; j++) {
                this.tilesMap[i][j] = new tiles.Floor(i, j);
            }
        }
    }

    generate(): void {
        let rooms: Rectangle[] = [];
        let numRooms = 0;

        let playerX = 0;
        let playerY

        for (let r = 0; r < this.maxRooms; r++) {
            let w = Math.floor(Math.random() * (this.roomMaxSize - this.roomMinSize - 1)) + this.roomMinSize;
            let h = Math.floor(Math.random() * (this.roomMaxSize - this.roomMinSize - 1)) + this.roomMinSize;

            let x = Math.floor(Math.random() * (this.mapWidth - w - 2) + 1);
            let y = Math.floor(Math.random() * (this.mapHeight - h - 2) + 1);

            let newRoom = new Rectangle(x, y, w, h);

            let failed = rooms.filter((otherRoom) => {
                return newRoom.intersects(otherRoom)
            }).length > 0;

            let newX: number;
            let newY: number;

            if (failed) {
                continue;
            }

            this.digRectangle(newRoom);
            newX = newRoom.centerX;
            newY = newRoom.centerY;

            if (numRooms === 0) {
                this.playerX = newX;
                this.playerY = newY;
            } else {
                let prevX = rooms[numRooms - 1].centerX;
                let prevY = rooms[numRooms - 1].centerY;

                if (Math.round(SeededRandom(Math.random(), 1, 0)) === 1) {
                    this.digHorizontalTunnel(prevX, newX, prevY);
                    this.digVerticalTunnel(prevY, newY, newX);
                } else {
                    this.digVerticalTunnel(prevY, newY, prevX);
                    this.digHorizontalTunnel(prevX, newX, newY);
                }
            }

            rooms.push(newRoom);
            numRooms++;
        }
    }

}