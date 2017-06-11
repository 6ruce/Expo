import { KeyboardKeys } from "./KeyboardKeys"
import { IActor }       from "../Actors/IActor"
import { Tuple2 }       from "../Common/Tuple"

import * as R from "ramda"

type KeyAction = [KeyboardKeys, (actor: IActor) => void];

/** Module contains functions for main character movements **/
export class HeroMovements {
    /** Update function used to update character properties for eacth update frame **/
    public static update(
        keyIsHeld: (key: KeyboardKeys) => boolean,
        heroActor: IActor,
        timeDelta: number
    ): IActor {
        let actions: [KeyAction] = [
            [ KeyboardKeys.Up    , hero => { hero.velocity.y = -300; } ],
            [ KeyboardKeys.Right , hero => { hero.acceleration.x = 800; } ],
            [ KeyboardKeys.Left  , hero => { hero.acceleration.x = -800; } ]
        ];
        let keyAction = R.find<KeyAction>(R.compose(keyIsHeld, Tuple2.first), actions);
        if (keyAction) Tuple2.second(keyAction)(heroActor);
        else {
            heroActor.velocity.y = 0;
            heroActor.velocity.x = 0;
            heroActor.acceleration.x = 0;
        }
        return heroActor;
    }
}
