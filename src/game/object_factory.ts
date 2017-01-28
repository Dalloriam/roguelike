import { GameObject } from "./engine";

import * as Components from "./components";

export interface ComponentTemplate {
    componentName: string;
    componentParameters: {[parameter: string]: any}
}

export interface ObjectTemplate {
    objectName: string;
    components: Array<ComponentTemplate>;
}

export function makeObject(template: ObjectTemplate): GameObject {
    for (let comp in Components) {
        console.log(comp, typeof comp);
    }
    return new GameObject("", []);
}