import { IActor }  from "./IActor"
import { Vector2 } from "../Common/Vector2"

export class BaseActor implements IActor {
    public velocity: Vector2 = { x: 0, y: 0};
    public acceleration: Vector2 = { x: 0, y: 0};

    constructor(public x: number, public y: number, public width: number, public height: number) {}
}
