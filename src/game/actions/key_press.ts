import IAction from "../IAction";
import dispatcher from "../dispatcher";

export class KeyPressReceivedAction implements IAction {
    type = "KEYPRESS_RECEIVED";

    public key: string;

    constructor(key: string) {
        this.key = key;
    }
}

export function CreateKeyPressReceivedAction(key: string) {
    dispatcher.dispatch(new KeyPressReceivedAction(key));
}
