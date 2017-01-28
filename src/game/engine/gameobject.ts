import { Component, PriorityEventChain } from ".";

import { IEvent } from "./IEvent";



export class GameObject {
    static CurrendID: number = 0;

    ID: number;
    Name: string;

    components: Array<Component>;

    private eventChain: PriorityEventChain;

    constructor(name: string) {
        // ID generation
        this.ID = GameObject.CurrendID;
        GameObject.CurrendID++
        this.Name = name;

        this.components = [];

        this.eventChain = new PriorityEventChain();
    }

    public hasComponent(component: string): boolean {
        return this.components.filter((c) => c.Name == component).length > 0;
    }

    private subsribeComponent(component: Component) {
        component.handlers.forEach((sub) => {
            this.eventChain.subscribe(sub.name, sub.priority, sub.callback);
        })
    }

    private unsubscribeComponent(component: Component) {
        component.handlers.forEach((sub) => {
            this.eventChain.unsubscribe(sub.name, sub.callback);
        })
    }

    public addComponent(component: Component, remote: boolean) {
        if (this.components.indexOf(component) != -1) {
            return false;
        }

        this.components.push(component);

        this.subsribeComponent(component)

        if (!remote) {
            component.setGameObject(this);
        }
    }

    public removeComponent(component: Component, remote: boolean) {
        if (this.components.indexOf(component) == -1) {
            return false;
        }

        this.components.splice(this.components.indexOf(component), 1);
        this.unsubscribeComponent(component)

        if (!remote) {
            component.removeGameObject();
        }
    }

    public emit(event: IEvent) {
        return this.eventChain.emit(event);
    }
}
