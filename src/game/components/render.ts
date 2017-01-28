import { Component, IEvent } from "../engine";

export class GetRenderInfo implements IEvent {
    ID = "GetRenderInfo";

    char: string;
    charFg: string;
    charBg: string;
}

export class Render extends Component {

    Name = "render";

    Char: string;
    CharFg: string;
    CharBg: string;

    constructor(char: string, charFg: string, charBg: string) {
        super();
        this.Char = char;
        this.CharFg = charFg;
        this.CharBg = charBg;

        this.addHandler("GetRenderInfo", this.getRenderInfo, 100);
    }

    getRenderInfo(e: IEvent): boolean | IEvent {
        let evt = e as GetRenderInfo;

        evt.char = this.Char;
        evt.charBg = this.CharBg;
        evt.charFg = this.CharFg;

        return evt;
    }
    
}