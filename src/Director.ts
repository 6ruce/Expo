import { IScene } from "./Scenes/IScene"
import { Actor } from "./Actors/Actor"
import { ActorExtender } from "./ActorExtender"
import * as Ex from "excalibur"
import * as R from "ramda"

type Resources = {
    textures: {
        Person: Ex.Texture
    }
}

export class Director {
    public static direct(engine: Ex.Engine, scenes: IScene[], resources: Resources) {
        scenes.forEach(scene => {
            console.log(`${scene.name} - loaded`)
            engine.add(scene.name, Director.createScene(scene, resources, engine));
        });
    }

    private static createScene(gameScene: IScene, resources: Resources, engine: Ex.Engine): Ex.Scene {
        const scene = new Ex.Scene();
        gameScene.actors.forEach(actor => {
            console.log("Actor - loaded")
            scene.add(Director.createActor(actor, resources, engine))
        });
        return scene;
    }

    private static createActor(gameObject: Actor, resources: Resources, engine: Ex.Engine): Ex.Actor {
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
                let playerIdleSheet = new Ex.SpriteSheet(resources.textures.Person, 5, 1, 32, 63);
            let playerIdleAnimation = playerIdleSheet.getAnimationBetween(engine, 1, 3, 125);
            playerIdleAnimation.loop = true;
                actor.addDrawing("idle", playerIdleAnimation);
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
