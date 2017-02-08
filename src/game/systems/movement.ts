import World from "../world";

import { System } from "./system";

import { GameObject } from "../engine";

import { Direction } from "../direction";

import { GetMovement, PositionChange, GetPosition, GetBlocking } from "../events";

export class MovementSystem extends System {

    Update() {
        this.world.objects.forEach((obj) => {
            // See if object wants to move
            let mov = obj.emit(new GetMovement()) as GetMovement;
            if (!(mov) || mov.movement == undefined) {
                // Terminate if object doesn't want to move
                return;
            }

            // Object wants to move, compute its new coordinates
            let pos = obj.emit(new GetPosition()) as GetPosition;

            let dX = 0, dY = 0;

            switch(mov.movement) {
                case Direction.UP:
                    dX = 0;
                    dY = -1;
                    break;
                case Direction.DOWN:
                    dX = 0;
                    dY = 1;
                    break;
                case Direction.RIGHT:
                    dX = 1;
                    dY = 0;
                    break;
                case Direction.LEFT:
                    dX = -1;
                    dY = 0;
                    break;
                case Direction.DOWN_RIGHT:
                    dX = 1;
                    dY = 1;
                    break;
                case Direction.DOWN_LEFT:
                    dX = -1;
                    dY = 1;
                    break;
                case Direction.UP_RIGHT:
                    dX = 1;
                    dY = -1;
                    break;
                case Direction.UP_LEFT:
                    dX = -1;
                    dY = -1;
                    break;
            }

            let newX = pos.X + dX;
            let newY = pos.Y + dY;

            let blockInfo = obj.emit(new GetBlocking()) as GetBlocking;
            let myBlock = blockInfo && blockInfo.isBlocking;

            var otherBlock = false;

            let otherObj = this.world.map.tilesMap[newX][newY];

            let otherPos = otherObj.emit(new GetPosition()) as GetPosition;

            if (newX == otherPos.X && newY == otherPos.Y) {
                otherBlock = (otherObj.emit(new GetBlocking()) as GetBlocking).isBlocking;
                if (otherBlock) {
                    return;
                }
            }

            if (!otherBlock) {
                for(let i = 0; i < this.world.objects.length; i ++) {
                    let otherObj = this.world.objects[i];

                    let otherPos = otherObj.emit(new GetPosition()) as GetPosition;

                    if (newX == otherPos.X && newY == otherPos.Y) {
                        otherBlock = (otherObj.emit(new GetBlocking()) as GetBlocking).isBlocking;
                        break;
                    }
                }
            }

            if (!(myBlock && otherBlock)) {
                // Can move
                obj.emit(new PositionChange(dX, dY));
            }
        });
    }
}

