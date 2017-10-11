import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
    fetchIngredients,
} from "Redux/Ingredients/Actions";

import Page from "Components/Page";

import Fermentable from "./Fermentable";

import "./styles.css";

class Ingredients extends Component {
    static propTypes = {
        ingredients: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.dispatch(fetchIngredients());
    }

    render() {
        const {
            ingredients,
        } = this.props;

        return (
            <Page>
                { ingredients.fermentables
                    .sort((a, b) => {
                        if (a.name === b.name) {
                            return 0;
                        }
                        return a.name > b.name ? 1 : -1;
                    })
                    .map((fermentable, key) =>
                        <Fermentable fermentable={fermentable} key={key} />
                    )}
            </Page>
        );
    }
}

function select(state) {
    return {
        ingredients: state.ingredients,
    }
}

export default connect(select)(Ingredients);
