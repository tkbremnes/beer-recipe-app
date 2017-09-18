import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import "./style.css";

import style from '../../bjcp/style.js';

import RecipeCard from "../RecipeCard";

import Utils from '../../Utils/Utils';

function RecipeListItem ({recipe}) {
    const recipeUrl = `/recipes/${ recipe.id }`;

    const calculatedMeta = Utils.calculateRecipeMeta(recipe);

    let abv = 0;
    let ibu = 0;
    let ebc = 0;
    if (calculatedMeta && calculatedMeta.alcohol) {
        abv = parseFloat((calculatedMeta.alcohol.abv * 100).toPrecision(2));
    }

    if (calculatedMeta && calculatedMeta.bitterness) {
        ibu = Math.round(calculatedMeta.bitterness.ibu || 0);
    }

    if (calculatedMeta && calculatedMeta.color) {
        ebc = Math.round(calculatedMeta.color.ebc || 0);
    }

    return (
        <Link className="block" to={ recipeUrl }>
            <RecipeCard
                name={ recipe.meta.name }
                style={ recipe.meta.style && style.getStyle(recipe.meta.style).name }
                abv={ abv }
                ibu={ ibu }
                ebc={ ebc }
            />
        </Link>
    )
}

RecipeListItem.propTypes = {
    recipe: PropTypes.object.isRequired,
}

export default RecipeListItem;
