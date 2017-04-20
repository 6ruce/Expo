import * as Ex from "excalibur"

export class ActorExtender extends Ex.Actor {
    public updater: ((engine: Ex.Engine, delta: number) => void) | null = null;
    public update(engine: Ex.Engine, delta: number) {
        if (this.updater != null) {
            this.updater(engine, delta);
        }
        super.update(engine, delta);
    }
}
