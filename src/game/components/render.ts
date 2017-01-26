import { IComponent, IEvent } from "../engine";

export class GetDisplayChar implements IEvent {
    ID = "GetDisplayChar";
    DisplayChar: string;

    constructor() {
        this.DisplayChar = "";
    }
}

export class Render implements IComponent {

    Name = "render";

    Char: string;
    CharFg: string;
    CharBg: string;

    constructor(char: string, charFg: string, charBg: string) {
        this.Char = char;
        this.CharFg = charFg;
        this.CharBg = charBg;
    }

    FireEvent(e: IEvent): boolean {
        return false;
    }

}