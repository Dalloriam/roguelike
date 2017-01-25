import { IComponent } from "./IComponent";

import { IEvent } from "./IEvent";



export class GameObject {
    Components: Array<IComponent>;
    Name: string

    constructor(name: string, components: Array<IComponent>) {
        this.Components = components;
        this.Name = name;
    }

    FireEvent(e: IEvent) {
        this.Components.forEach((component) => {
            component.FireEvent(e);
        });
    }
}