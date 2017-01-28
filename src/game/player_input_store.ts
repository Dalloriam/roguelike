import { EventEmitter } from "events";

import IAction from "./IAction";
import { KeyPressReceivedAction } from "./actions/key_press";

import dispatcher from "./dispatcher";

class PlayerInputStore extends EventEmitter {
    key: string;

    getKey(): string {
        return this.key;
    }

    handleActions(action: IAction) {
        switch (action.type)  {
            case "KEYPRESS_RECEIVED":
                this.key = (action as KeyPressReceivedAction).key;
                this.emit("tick");
                break;
        }
    }
}

const store = new PlayerInputStore();
dispatcher.register(store.handleActions.bind(store));
export default store;