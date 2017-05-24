import { Director } from "./Director"
import { ExpoScene } from "./Scenes/ExpoScene"
import * as Ex from "excalibur"

export class App {
    initialize() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }
    onDeviceReady() {
        let game = new Ex.Engine({
            width: 800,
            height: 500,
            displayMode: Ex.DisplayMode.Container
        });

        //Physics configuration
        Ex.Physics.collisionResolutionStrategy = Ex.CollisionResolutionStrategy.RigidBody;
        Ex.Physics.acc.setTo(0, 700);


        console.log("Game started!")
        let txAnimPlayerIdle = new Ex.Texture("/img/hero.png");
        let boxTexture = new Ex.Texture("/img/box.png");
        let loader = new Ex.Loader([txAnimPlayerIdle, boxTexture]);
        game.start(loader).then(() => {
            Director.direct(game, [new ExpoScene()], {
                textures: {
                    Person: txAnimPlayerIdle,
                    Box: boxTexture
                }
            });
            game.goToScene("MainScene");
        });

    }
}

var app = new App();
app.initialize();
console.log("Cordova app initialized");
