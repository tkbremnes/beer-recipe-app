// NOTE: These equations also work for degrees Celsius, liters and kilograms.
// The only difference is that the thermodynamic constant of .2 changes to .41.

// http://howtobrew.com/book/section-3/the-methods-of-mashing/calculations-for-boiling-water-additions

const isMetric = true;
const thermodynamicConstant = isMetric ? 0.41 : 0.2;

export function getStrikeWaterTemperature(grainWeight, waterAmount, initialTemp, targetTemp) {
    if (!(grainWeight
        && waterAmount
        && initialTemp
        && targetTemp
    )) {
        return;
    }

    const grainWeightInKg = grainWeight / 1000;
    const waterToGrainRatio = waterAmount / grainWeightInKg;

    return (thermodynamicConstant / waterToGrainRatio) * (targetTemp - initialTemp) + targetTemp;
}

export default {
    getStrikeWaterTemperature: function getStrikeWaterTemperature(grainWeight, waterAmount, initialTemp, targetTemp) {
        const grainWeightInKg = grainWeight / 1000;
        const waterToGrainRatio = waterAmount / grainWeightInKg;
        return (thermodynamicConstant / waterToGrainRatio) * (targetTemp - initialTemp) + targetTemp;
    }

    // Mash Infusion Equation:
    // const Wa = (T2 - T1)(thermodynamicConstant * grainWeight + Wm)/(Tw - targetTemp)
}
