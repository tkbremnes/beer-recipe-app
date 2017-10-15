import specificGravityToGravityPoints from "./specificGravityToGravityPoints";
import gravityPointsToSpecificGravity from "./gravityPointsToSpecificGravity";

export default function (preboilVolume, postboilVolume, targetGravity) {
    const targetGravityPoints = specificGravityToGravityPoints(targetGravity);

    const gravityPoints =  (postboilVolume*targetGravityPoints)
        /preboilVolume;

    return gravityPointsToSpecificGravity(Math.round(gravityPoints));
}
