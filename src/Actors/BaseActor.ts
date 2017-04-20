import { IActor } from "./IActor"

export class BaseActor implements IActor {
    constructor(public x: number, public y: number, public width: number, public height: number) {}
}
