import { GameObject } from "../engine";

import { Render } from "../components/render";


export default class Tile extends GameObject {
    constructor(char: string, fg: string, bg: string) {
        super(
            "Tile",
            [
                new Render(char, fg, bg)
            ]
        );
    }
}