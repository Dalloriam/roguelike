import { GameObject } from "../engine";

import World from "../world";

export interface ISystem {
    Update(): void;
}
