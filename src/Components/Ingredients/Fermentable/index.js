import React from "react";
import PropTypes from "prop-types";

import Card from "Components/BruiCard";

function Fermentable({ fermentable }) {
    const printPotentialYield = (fermentable.potential_yield * 100);
    return (
        <Card>
            <p>{fermentable.name}</p>
            <p>{fermentable.color} SRM</p>
            <p>{printPotentialYield}%</p>
        </Card>
    )
}
Fermentable.propTypes = {
    fermentable: PropTypes.object.isRequired,
}

export default Fermentable;
