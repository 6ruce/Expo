import { KeyboardKeys } from "../../Animation/KeyboardKeys"
import { Tuple2 } from "../../Common/Tuple"
import { IActor } from "../../Actors/IActor"

import * as Ex from "excalibur"
import * as R from "ramda"

type KeyMap = [Ex.Input.Keys, KeyboardKeys];

export class Mapper {
    public static map: [KeyMap] = [
        [Ex.Input.Keys.Up, KeyboardKeys.Up],
        [Ex.Input.Keys.Down, KeyboardKeys.Down],
        [Ex.Input.Keys.Right, KeyboardKeys.Right],
        [Ex.Input.Keys.Left, KeyboardKeys.Left]
    ];

    public static mapEngineKeys(engineKey: Ex.Input.Keys): KeyboardKeys {
        let pair = R.find<KeyMap>(
            R.compose(R.equals(engineKey), Tuple2.first), Mapper.map);
        if (pair) {
            return Tuple2.second(pair);
        }
        throw `Undefined map for key: ${engineKey}`;
    }

    public static mapDomainKeys(domainKey: KeyboardKeys): Ex.Input.Keys {
        let pair = R.find<KeyMap>(
            R.compose(R.equals(domainKey), Tuple2.second), Mapper.map);
        if (pair) {
            return Tuple2.first(pair);
        }
        throw `Undefined map for key: ${domainKey}`;
    }

    public static applyPersonChangesToActor(
        domainActor: IActor,
        engineActor: Ex.Actor) {
        engineActor.body.vel.y = domainActor.velocity.y || engineActor.body.vel.y;
        engineActor.body.vel.x = domainActor.velocity.x || engineActor.body.vel.x;
        engineActor.body.acc.x = domainActor.acceleration.x;
        engineActor.body.acc.y = domainActor.acceleration.y;
    }
}
