import { BaseLevel } from ".";
import { Dungeon } from "./environments/dungeon";

import { SeededRandom } from "../engine";

export function GenerateLevel(width: number, height: number): BaseLevel {

    // Select seed part
    let levelSeed = Math.random() * 10;
    return new Dungeon(width, height, 10);
}