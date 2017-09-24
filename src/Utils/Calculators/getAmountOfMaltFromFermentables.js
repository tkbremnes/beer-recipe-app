import assert from "assert";

function calculateGravityPointsByVolume(specificGravity, volume) {
    const gravityPoints = (specificGravity * 1000) - 1000; // calculate kgs for floating point reasons
    return gravityPoints * volume;
}

function getAmountOfMalt(specificGravity, volume, ratio, potentialYield, brewhouseEfficiency) {
    assert.ok(volume, "volume is required");
    assert.ok(specificGravity, "specificGravity is required");
    assert.ok(ratio, "ratio is required");
    assert.ok(potentialYield, "potentialYield is required");
    assert.ok(brewhouseEfficiency, "brewhouseEfficiency is required");

    const gravityPointsByVolume = calculateGravityPointsByVolume(specificGravity, volume);

    const SUGAR_GRAVITY_POINTS = 384;

    const upper = gravityPointsByVolume * ratio;
    const under = potentialYield * SUGAR_GRAVITY_POINTS * brewhouseEfficiency;

    return (upper / under) * 1000; // returns grams
}

function getAmountOfMaltFromFermentables(fermentables, specificGravity, batchVolume, brewhouseEfficiency) {
    let result = 0;

    fermentables.forEach((fermentableAddition) => {
        result += getAmountOfMalt(
            specificGravity,
            batchVolume,
            fermentableAddition.amount,
            fermentableAddition.fermentable.potential_yield,
            brewhouseEfficiency
        );
    });

    return result;
}

function ppgToPercentage(ppg) {
    const PPG_SUGAR = 46;

    return ppg/PPG_SUGAR;
}

export default getAmountOfMaltFromFermentables;
