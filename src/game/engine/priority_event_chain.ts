import { IEvent, Component } from ".";

interface EventSubscription {
    priority: number;
    callback: (evt: IEvent) => IEvent | boolean;
}

export class PriorityEventChain {

    private eventTypes: Array<String>;

    private chains: {[eventName: string]: Array<EventSubscription>};

    constructor() {
        this.chains = {};
        this.eventTypes = [];
    }

    public subscribe(name: string, priority: number, callback: (evt: IEvent) => IEvent | boolean): void {

        let sub = {priority: priority, callback: callback} as EventSubscription;

        if (!(name in this.chains)) {
            this.eventTypes.push(name);
            this.chains[name] = [];
        }

        this.chains[name].push(sub);
        this.chains[name].sort((a, b): number => a.priority - b.priority);
    }

    public unsubscribe(name: string, callback: (evt: IEvent) => IEvent | boolean): void {
        if (!(name in this.chains)) {
            return;
        }

        for (let idx = 0, l = this.chains[name].length; idx < l; idx++) {
            let sub = this.chains[name][idx];
            if (sub.callback === callback) {
                this.chains[name].splice(idx, 1);
                l--;
                idx--;
            }
        }

        if (this.chains[name].length === 0) {
            delete this.chains[name];
            this.eventTypes.splice(this.eventTypes.indexOf(name), 1);
        }
    }

    public emit(event: IEvent): IEvent {
        let name = event.ID;
        if (!(name in this.chains)) {
            return;
        }

        for (let idx = 0, l = this.chains[name].length; idx < l; idx++) {
            let sub = this.chains[name][idx];
            let result: IEvent | boolean = sub.callback(event);
            if (!result) {
                break;
            } else {
                event = result as IEvent;
            }
        }

        return event;
    }
}