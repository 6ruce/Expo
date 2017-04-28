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

        Director.direct(game, [new ExpoScene()]);

        console.log("Game started!")
        game.start();
        game.goToScene("MainScene");

    }
}

var app = new App();
app.initialize();
console.log("Cordova app initialized");
