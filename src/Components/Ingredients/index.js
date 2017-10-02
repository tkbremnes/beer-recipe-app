import React, {Component} from "react";
import PropTypes from "prop-types";

import Page from "Components/Page";

import Fermentable from "./Fermentable";

import "./styles.css";


const ingredients = {
    fermentables: [
        {
            "name": "Maris Otter",
            "origin": "United Kingdom",
            "type": "GRAIN",
            "color": 3,
            "must_mash": true,
            "potential_yield": 0.782,
            "max_in_batch": 1
        },
        {
            "name": "Pilsner (2 Row) Ger",
            "origin": "Germany",
            "type": "GRAIN",
            "color": 2,
            "must_mash": true,
            "potential_yield": 0.804,
            "max_in_batch": 1
        }
    ]
}

class Ingredients extends Component {
    static propTypes = {
        ingredients: PropTypes.array,
    }

    render() {
        // const {
        //     ingredients,
        // } = this.props;

        return (
            <Page>
                { ingredients.fermentables.map(fermentable =>
                    <Fermentable fermentable={fermentable} />
                )}
            </Page>
        );
    }
}

export default Ingredients;
