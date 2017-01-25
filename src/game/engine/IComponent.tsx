import { IEvent } from "./IEvent";

export interface IComponent {
    FireEvent(e: IEvent): boolean;
}
