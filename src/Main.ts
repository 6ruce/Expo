import { Director } from "./Director"
import { ExpoScene } from "./Scenes/ExpoScene"
import * as Ex from "excalibur"

let game =  new Ex.Engine({
    width: 800,
    height: 500,
    displayMode: Ex.DisplayMode.Container
});

//Physics configuration
Ex.Physics.collisionResolutionStrategy = Ex.CollisionResolutionStrategy.RigidBody;
Ex.Physics.acc.setTo(0, 700);

Director.direct(game, [ new ExpoScene() ]);

game.start();
game.goToScene("MainScene");
