import { IScene } from "./Scenes/IScene"
import { Actor } from "./Actors/Actor"
import { ActorExtender } from "./ActorExtender"
import * as Ex from "excalibur"
import * as R from "ramda"

export class Director {
    public static direct(engine: Ex.Engine, scenes: IScene[]) {
        scenes.forEach(scene => {
            console.log(`${scene.name} - loaded`)
            engine.add(scene.name, Director.createScene(scene));
        });
    }

    private static createScene(gameScene: IScene): Ex.Scene {
        const scene = new Ex.Scene();
        gameScene.actors.forEach(actor => {
            console.log("Actor - loaded")
            scene.add(Director.createActor(actor))
        });
        return scene;
    }

    private static createActor(gameObject: Actor): Ex.Actor {
        let actor = new Ex.Actor(gameObject.x, gameObject.y,
            gameObject.width, gameObject.height, Ex.Color.Black);
        switch (gameObject.kind) {
            case "Person":
                actor = new ActorExtender(gameObject.x, gameObject.y,
                    gameObject.width, gameObject.height, Ex.Color.Black);
                (actor as ActorExtender).updater = (engine: Ex.Engine, delta: number) => {
                    if (engine.input.keyboard.isHeld(Ex.Input.Keys.Up)) {
                        actor.body.acc.y = -3000;
                    } else {
                        actor.body.acc.y = 0;
                    }
                    if (engine.input.keyboard.isHeld(Ex.Input.Keys.Right)) {
                        actor.body.acc.x = 500;
                    } else if (engine.input.keyboard.isHeld(Ex.Input.Keys.Left)) {
                        actor.body.acc.x = -500;
                    } else {
                        actor.body.acc.x = 0;
                    }
                };
                actor.collisionType = Ex.CollisionType.Active;
                break;
            case "Thing":
                actor.collisionType = Ex.CollisionType.Active;
                actor.color = Ex.Color.Orange;
                break;
            case "Ground":
                actor.collisionType = Ex.CollisionType.Fixed;
                break;
            default:
                console.error(`Unknown actor kind: ${gameObject.kind}`);
        }
        return actor;
    }
}
