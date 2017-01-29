import { IEvent } from "../engine";

export class GetDetectableChance implements IEvent {
    ID = "GetDetectableChance";
    detectableChance: number;
}