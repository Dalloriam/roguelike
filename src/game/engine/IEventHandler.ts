import { IEvent } from ".";

export interface IEventHandler {
    name: string;
    priority: number;
    callback: (evt: IEvent) => IEvent | boolean
}