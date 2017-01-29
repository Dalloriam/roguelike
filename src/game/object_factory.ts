import { GameObject, Component } from "./engine";

import * as Components from "./components";

let COMPONENT_TABLE: {[componentName: string]: any} = {
}

export interface ComponentTemplate {
    componentName: string;
    componentParameters: {[parameter: string]: any}
    isRemote: boolean;
}

export interface ObjectTemplate {
    objectName: string;
    components: Array<ComponentTemplate>;
}

export function makeObject(template: ObjectTemplate): GameObject {
    let obj = new GameObject(template.objectName);

    template.components.forEach((desiredComponent) => {
        let componentType = (<any>Components)[desiredComponent.componentName];

        let cInstance = new componentType() as Component;

        for(let param in desiredComponent.componentParameters) {
            (<any>cInstance)[param] = desiredComponent.componentParameters[param];
        }

        obj.addComponent(cInstance, desiredComponent.isRemote);
    })

    return obj;
}