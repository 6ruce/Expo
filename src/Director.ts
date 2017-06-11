import { IScene }        from "./Scenes/IScene"
import { Actor }         from "./Actors/Actor"
import { Person }        from "./Actors/Person"
import { ActorExtender } from "./ActorExtender"
import { HeroMovements } from "./Animation/HeroMovements"
import { Mapper }        from "./EngineAdapters/Expo/Mapper"

import * as Ex           from "excalibur"
import * as R            from "ramda"

type Resources = {
    textures: {
        Person: Ex.Texture,
        Box: Ex.Texture,
        Background: Ex.Texture
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
                actor.friction = 0.5;
                (actor as ActorExtender).updater = (engine: Ex.Engine, delta: number) => {
                    actor.rotation = 0;
                    actor.rx = 0;
                    const keyHeldFn: typeof engine.input.keyboard.isHeld = engine.input.keyboard.isHeld.bind(engine.input.keyboard);
                    const updatedHero = HeroMovements.update(
                        R.compose(keyHeldFn, Mapper.mapDomainKeys),
                        <Person>gameObject,//Not quite good solution, think about Groub|Person type again
                        delta);
                    Mapper.applyPersonChangesToActor(updatedHero, actor);
                };
                actor.collisionType = Ex.CollisionType.Active;
                let playerIdleSheet = new Ex.SpriteSheet(resources.textures.Person, 5, 1, 32, 63);
                let playerIdleAnimation = playerIdleSheet.getAnimationBetween(engine, 1, 3, 200);
                playerIdleAnimation.loop = true;
                actor.addDrawing("idle", playerIdleAnimation);
                break;
            case "Thing":
                actor.collisionType = Ex.CollisionType.Active;
                actor.color = Ex.Color.Orange;
                actor.addDrawing(new Ex.Sprite(resources.textures.Box, 0, 0, 32, 32));
                break;
            case "Ground":
                actor.color = new Ex.Color(77, 112, 44, 0.5);
                actor.collisionType = Ex.CollisionType.Fixed;
                break;
            case "Background":
                let backgroundTexture = resources.textures.Background;
                let background = new Ex.Sprite(backgroundTexture, 0, 0, backgroundTexture.width, backgroundTexture.height);
                actor = new Ex.Actor(0, 0, background.width, background.height);
                actor.anchor.setTo(0, 0);
                actor.addDrawing(background);
                actor.collisionType = Ex.CollisionType.PreventCollision;
                actor.scale = new Ex.Vector(window.innerWidth / background.width, window.innerHeight / background.height);
                break;
            default:
                console.error(`Unknown actor kind: ${gameObject.kind}`);
        }
        return actor;
    }
}
