import alcoholCalculator from './abv_calculator.js';
import tinseth from "tinseth";

import getAmountOfMaltFromFermentables from "./Calculators/getAmountOfMaltFromFermentables";

function calculateBitternessFromRecipe(recipe) {
    function calculateIbu(
        postBoilGravity,
        boilSize,
        batchSize,
        alphaAcids,
        amount,
        time,
        isPellets,
        maximumUtilizationValue
    ) {
        let res = tinseth(
            postBoilGravity,
            boilSize,
            batchSize,
            alphaAcids,
            amount,
            time,
            maximumUtilizationValue
        );

        if (isPellets) {
            res = res * 1.1;
        }

        if (isNaN(res)) {
            return 0;
        }
        return res;
    }

    const postBoilGravity = recipe.meta.original_gravity;
    const boilSize = recipe.meta.boilSize || 25;
    const batchSize = recipe.meta.batchSize || 20;
    const maximumUtilizationValue = recipe.maximumUtilizationValue || 4.15;

    let ibuSum = 0;
    recipe.hops.forEach((_h) => {
        if(_h.time === "DH") {
            return 0;
        }

        const isPellets = true;
        const ibuFromAddition = calculateIbu(
            postBoilGravity,
            boilSize,
            batchSize,
            parseFloat(_h.hop.alpha_acids) || 0,
            parseInt(_h.weight, 10) || 0,
            parseInt(_h.time, 10) || 0,
            isPellets,
            maximumUtilizationValue
        )
        ibuSum += ibuFromAddition;
    });

    return {
        ibu: ibuSum,
        ebu: 0 // TODO
    };
}

function calculateColorFromRecipe(recipe) {
    // recipe color is defined as SRM

    let colorSum = 0;
    recipe.fermentables.forEach((_f) => {
        if (!_f.weight || !_f.fermentable || !_f.fermentable.color) {
            colorSum += 0;
            return;
        }

        const weight = 0.00220462262 * _f.weight;
        const color = _f.fermentable.color / 1.97;
        const volumeInGallons = 13.5;

        const mcu = weight * color / volumeInGallons;

        colorSum += mcu;
    });
    //Morey
    const srm = 1.4922 * Math.pow(colorSum, 0.6859) || 0;
    const ebc = srm * 1.97 || 0;

    return { srm, ebc };
}

function calculateAlcoholFromRecipeMeta(meta) {
    const fg = meta.final_gravity;
    const og = meta.original_gravity;

    return alcoholCalculator.getAlcohol(og, fg);
}

function calculateAlcoholFromRecipe(recipe) {
    const fg = recipe.meta.final_gravity;
    const og = recipe.meta.original_gravity;

    return alcoholCalculator.getAlcohol(og, fg);
}

function calculateRecipeMeta(recipe) {
    const alcohol = calculateAlcoholFromRecipe(recipe);
    const bitterness = calculateBitternessFromRecipe(recipe);
    const color = calculateColorFromRecipe(recipe);

    return {
        alcohol,
        color,
        bitterness
    };
}

// Ratio should be 1
function getPotentialSpecificGravity(amountOfGrain, volume, ratio, potentialYield, brewhouseEfficiency) {
    const SUGAR_GRAVITY_POINTS = 384;
    const upper = (potentialYield * SUGAR_GRAVITY_POINTS * brewhouseEfficiency * (amountOfGrain/1000));
    const lower = (volume * ratio);

    return ((upper/lower) + 1000) / 1000;
}

const Utils = {
    calculateRecipeMeta,
    calculateAlcoholFromRecipe,
    calculateAlcoholFromRecipeMeta,
    calculateBitternessFromRecipe,
    calculateColorFromRecipe,

    getAmountOfMaltFromFermentables,
    getPotentialSpecificGravity,
}

export default Utils;
