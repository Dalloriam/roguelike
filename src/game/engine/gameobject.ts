import { IComponent } from "./IComponent";

import { IEvent } from "./IEvent";



export class GameObject {
    static CurrendID: number = 0;

    ID: number;
    Components: Array<IComponent>;
    Name: string;

    constructor(name: string, components: Array<IComponent>) {
        // ID generation
        this.ID = GameObject.CurrendID;
        GameObject.CurrendID++

        this.Components = components;
        this.Name = name;
    }

    hasComponent(componentName: string): boolean {
        return this.Components.filter((c) => {
            return c.Name == componentName;
        }).length > 0;
    }

    getComponent(componentName: string): IComponent {
        for (let i = 0; i < this.Components.length; i++) {
            if (this.Components[i].Name == componentName) {
                return this.Components[i];
            }
        }
    }

    FireEvent(e: IEvent) {
        e.SenderID = this.ID;
        this.Components.forEach((component) => {
            component.FireEvent(e);
        });
    }
}