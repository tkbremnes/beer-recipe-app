import assert from "assert";

const MOREY_CONSTANT = 1.97;

export function srmToEbc(srm) {
    assert.ok(srm, "srm is required");
    return srm * MOREY_CONSTANT;
}

export function ebcToSrm(ebc) {
    assert.ok(ebc, "ebc is required");
    return ebc / MOREY_CONSTANT;
}

export default function calculateColor(fermentables, volume) {
    assert.ok(fermentables, "fermentables is required");

    const colorSum = fermentables.reduce((sum, fermentable) => {
        const weight = 0.00220462262 * fermentable.weight;
        const color = fermentable.color / 1.97;
        const volumeInGallons = volume / 3.785411784;

        const mcu = weight * color / volumeInGallons;

        return sum += mcu;
    }, 0);

    return 1.4922 * Math.pow(colorSum, 0.6859);
}
