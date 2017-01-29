import { IEvent } from "../engine";


export class GetRenderInfo implements IEvent {
    ID = "GetRenderInfo";

    char: string;
    charFg: string;
    charBg: string;
}