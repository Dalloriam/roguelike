import { IEvent } from "./IEvent";

export interface IComponent {
    Name: string;
    FireEvent(e: IEvent): boolean;
}
