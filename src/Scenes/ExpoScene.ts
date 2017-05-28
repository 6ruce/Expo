import { IScene } from "./IScene"
import { Actor } from "../Actors/Actor"
import { Person } from "../Actors/Person"
import { Thing } from "../Actors/Thing"
import { Ground } from "../Actors/Ground"
import { Background } from "../Actors/Background"

export class ExpoScene implements IScene {
    constructor(){}
    public name = "MainScene";
    public get actors(): Actor[] {
        return [
            new Background(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
            new Person(250, 400, 32, 63),
            new Thing(250, 300, 32, 32),
            new Thing(150, 100, 32, 32),
            new Thing(350, 100, 32, 32),
            new Ground(window.innerWidth/2, window.innerHeight-100, window.innerWidth, 50),
        ];
    }
}
