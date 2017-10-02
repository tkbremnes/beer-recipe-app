import React from "react";
import PropTypes from "prop-types";

import Card from "Components/BruiCard";

import {
    percentageToPpg,
} from "Utils/Calculators/getAmountOfMaltFromFermentables"

function Fermentable({ fermentable }) {
    const printPotentialYield = (fermentable.potential_yield * 100);
   const printPpg = `1.0${ Math.round(percentageToPpg(fermentable.potential_yield)) }`;
    return (
        <Card>
            <p>{fermentable.name}</p>
            <p>{fermentable.color} SRM</p>
            <p>{printPotentialYield}% ({printPpg} PPG)</p>
        </Card>
    )
}
Fermentable.propTypes = {
    fermentable: PropTypes.object.isRequired,
}

export default Fermentable;
