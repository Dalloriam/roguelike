import { IEvent, GameObject, IEventHandler } from ".";

export class Component {
    readonly Name: string;

    private priority: number;

    private gameObject: GameObject;

    handlers: Array<IEventHandler>;

    constructor(priority?: number) {
        this.priority = priority || 0;
        this.handlers = [];
    }

    public setGameObject(obj: GameObject) {
        this.gameObject = obj;
    }

    public removeGameObject(): void {
        this.gameObject = null;
    }

    public addHandler(eventName: string, callback: (evt: IEvent) => IEvent | boolean, priority: number) {

        if (typeof priority === "undefined") {
            priority = this.priority;
        }

        this.handlers.push({
            name: eventName,
            priority: priority, 
            callback: callback.bind(this)
        });
    }
}