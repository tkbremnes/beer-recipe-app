import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import BruiCard from "../BruiCard";

function RecipeCard({name, beerStyle, abv, ibu, ebc}) {
    return (
        <BruiCard>
            <p className="RecipeCard-name">
                { name }
            </p>

            <p className="RecipeCard-type">
                { beerStyle }
            </p>

            <div className="RecipeCard-metaWrapper">
                {!!abv && <p className="RecipeCard-metadata">ABV: { abv }%</p>}
                {!!ibu && <p className="RecipeCard-metadata">IBU: { ibu }</p>}
                {!!ebc && <p className="RecipeCard-metadata">EBC: { ebc }</p>}
            </div>
        </BruiCard>
    )
}

RecipeCard.propTypes = {
    name: PropTypes.string.isRequired,
    beerStyle: PropTypes.string,
    ibu: PropTypes.number,
    ebc: PropTypes.number,
    abv: PropTypes.number,
}

export default RecipeCard;
