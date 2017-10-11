import React from "react";
import PropTypes from "prop-types";

import Card from "Components/BruiCard";

import {
    percentageToPpg,
} from "Utils/Calculators/getAmountOfMaltFromFermentables"

function Fermentable({ fermentable }) {
    let printPotentialYield = fermentable.potential_yield === 1 ?
        100 :
        (fermentable.potential_yield * 100).toPrecision(2);
    if (printPotentialYield === "0.0") {
        printPotentialYield = "0";
    }

    let printPpg = `1.0${ Math.round(percentageToPpg(fermentable.potential_yield)) }`;
    if (printPpg.length === 4) {
        printPpg += "0";
    }

    return (
        <Card>
            <p>{fermentable.name}</p>
            <p>{fermentable.color} SRM</p>
            <p>{printPotentialYield}% ({printPpg} SG)</p>
        </Card>
    )
}
Fermentable.propTypes = {
    fermentable: PropTypes.object.isRequired,
}

export default Fermentable;
