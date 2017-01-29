import { IEvent } from "../engine";


export class GetSeeThrough implements IEvent {
    ID = "GetSeeThrough";
    isSeeThrough: boolean;

    constructor() {
        this.isSeeThrough = true;
    }
}