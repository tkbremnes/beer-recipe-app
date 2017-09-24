import React from 'react';
import PropTypes from "prop-types";

import "./style.css";

import Stats from "./Stats";

function RecipeHeader({
    name,
    abv,
    ibu,
    color,
    beerStyle,
}) {
    function formatAbv(abv) {
        if (!abv) {
            return 0;
        }
        return (abv * 100).toPrecision(2);
    }

    function formatIbu(ibu) {
        if (!ibu) {
            return 0;
        }
        return Math.round(ibu) + "";
    }
    function formatEbc(ebc) {
        if (!ebc) {
            return 0;
        }
        return Math.round(ebc) + "";
    }

    const formattedAbv = formatAbv(abv);
    const formattedIbu = formatIbu(ibu);
    const formattedColor = formatEbc(color);

    return (
        <div className="RecipeHeader">
            <div className="wrapperRapper">
            <div>
                <div className="nameWrapper">
                <h1 className="h1">
                    { name }
                </h1>

                <p className="style">{ beerStyle }</p>

                </div>
            </div>

            <Stats
                ibu={formattedIbu}
                color={formattedColor}
                abv={formattedAbv}
            />

            </div>
        </div>
    )
}

RecipeHeader.propTypes = {
    name: PropTypes.string.isRequired,
    beerStyle: PropTypes.string.isRequired,

    abv: PropTypes.number.isRequired,
    ibu: PropTypes.number.isRequired,
    color: PropTypes.number.isRequired,
}

export default RecipeHeader;
