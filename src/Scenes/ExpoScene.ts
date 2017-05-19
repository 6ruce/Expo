import { IScene } from "./IScene"
import { Actor } from "../Actors/Actor"
import { Person } from "../Actors/Person"
import { Thing } from "../Actors/Thing"
import { Ground } from "../Actors/Ground"

export class ExpoScene implements IScene {
    constructor(){}
    public name = "MainScene";
    public get actors(): Actor[] {
        return [
            new Person(250, 400, 32, 63),
            new Thing(250, 300, 50, 50),
            new Thing(150, 100, 50, 50),
            new Thing(350, 100, 50, 50),
            new Ground(250, 500, 500, 50)
        ];
    }
}
