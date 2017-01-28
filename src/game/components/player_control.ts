import { IComponent, IEvent } from "../engine";

export class PlayerControl implements IComponent {
    Name = "player_control";

    FireEvent(evt: IEvent): boolean {
        return false
    }
}