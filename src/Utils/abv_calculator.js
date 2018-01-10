export function calculateAbw(originalGravity, measuredGravity) {
    return calculateAbv(originalGravity, measuredGravity) * 0.79336
}

function gravityToPlato(specificGravity) {
    return (-1 * 616.868)
        + (1111.14 * specificGravity)
        - (630.272 * specificGravity * specificGravity)
        + (135.997 * specificGravity * specificGravity * specificGravity);
}

export function calculateApparentAttenuation(originalGravity, measuredGravity) {
    return (originalGravity - measuredGravity) /(originalGravity - 1);
}

export function calculateCalories(originalGravity, measuredGravity) {
    const originalExtract = gravityToPlato(originalGravity);
    const apparentExtract = gravityToPlato(measuredGravity);
    const realExtract = .1808 * originalExtract + .8192 * apparentExtract;

    const abw = calculateAbw(originalGravity, measuredGravity) * 100;

    const caloriesPer12OzBottle = ((6.9 * abw + 4.0 * (realExtract - .1)) * 3.55 * measuredGravity);
    const res = (caloriesPer12OzBottle / 12) / 0.0295735296875;

    return res;
}

export function calculateAbv(originalGravity, measuredGravity) {
    if (measuredGravity > originalGravity) {
        return null;
    }

    const res = (76.08 * (originalGravity-measuredGravity) / (1.775-originalGravity)) * (measuredGravity / 0.794);
    return res / 100;
}

export default {
    getAbv: calculateAbv,
    getAlcohol: (originalGravity, measuredGravity) => {
        return {
            abv: calculateAbv(originalGravity, measuredGravity) || 0,
        }
    }
}
