import { IEvent } from "../engine";


export class GetSightRadius implements IEvent {
    ID = "GetSightRadius";
    sightRadius: number;
}