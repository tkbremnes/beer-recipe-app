import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";

import BruiButton from "../BruiButton";
import RecipeCard from "../RecipeCard";
import BruiCard from "../BruiCard";

class ImportableRecipe extends Component {
    _handleOnClick() {
        const isProduction = false;
        if (isProduction) {

        }

        window.location = `http://localhost:3000/recipes/import?url=${ this.props.url }`
    }

    render() {
        const {
            name,
            beerStyle,
            ibu,
            ebc,
            abv
        } = this.props;

        return (
            <BruiCard>
                <div className="ImportableRecipe">
                    <RecipeCard
                        name={ name }
                        beerStyle={ beerStyle }
                        abv={ abv }
                        ebc={ ebc }
                        ibu={ ibu }
                    >
                    </RecipeCard>

                    <div className="import-button-wrapper">
                        <BruiButton onClick={ this._handleOnClick.bind(this) }>Import</BruiButton>
                    </div>
                </div>
            </BruiCard>
        )
    }
}

ImportableRecipe.propTypes = {
    name: PropTypes.string,
    beerStyle: PropTypes.string,
    ibu: PropTypes.number,
    ebc: PropTypes.number,
    abv: PropTypes.number,
}

export default ImportableRecipe;
