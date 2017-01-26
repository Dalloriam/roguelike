export default class Tile {
    fgColor: string;
    bgColor: string;
    char: string;

    constructor(fgColor: string, bgColor: string, char: string) {
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.char = char;  
    }
}