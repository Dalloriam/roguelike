import { BaseLevel } from ".";
import { Dungeon } from "./environments/dungeon";

import { SeededRandom } from "../engine";

export function GenerateLevel(): BaseLevel {

    let levelTypes = [
        Dungeon
    ];

    // Select level type
    let levelTypeSeed = Math.random();
    let levelType = levelTypes[SeededRandom(levelTypeSeed, levelTypes.length - 1, 0)];

    // Select seed part
}