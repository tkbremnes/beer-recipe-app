import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
    fetchIngredients,
} from "Redux/Ingredients/Actions";

import Page from "Components/Page";
import Card from "Components/BruiCard";

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

        function formatPotentialYield(potentialYield) {
            if (potentialYield === 0) {
                return 0;
            }
            if (potentialYield === 1) {
                return 100;
            }

            return (potentialYield * 100).toPrecision(2);
        }

        return (
            <Page>
                <Card header="Fermentables">
                    <table className="IngredientsTable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Color</td>
                                <td>Origin</td>
                                <td>Potential yield</td>
                                <td>Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            { ingredients.fermentables
                                .sort((a, b) => {
                                    if (a.name === b.name) {
                                        return 0;
                                    }
                                    return a.name > b.name ? 1 : -1;
                                })
                                .map((fermentable, key) =>
                                    <tr key={key}>
                                        <td>{fermentable.name}</td>
                                        <td>{fermentable.color}</td>
                                        <td>{fermentable.origin}</td>
                                        <td>{formatPotentialYield(fermentable.potential_yield)}%</td>
                                        <td>{fermentable.type}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Card>

                <Card header="Hops">
                    <table className="IngredientsTable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Alpha Acids</td>
                                <td>Origin</td>
                                <td>Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            { ingredients.hops
                                .sort((a, b) => {
                                    if (a.name === b.name) {
                                        return 0;
                                    }
                                    return a.name > b.name ? 1 : -1;
                                })
                                .map((hop, key) =>
                                    <tr key={key}>
                                        <td>{hop.name}</td>
                                        <td>{(hop.alpha_acids*100).toPrecision(2)}%</td>
                                        <td>{hop.origin}</td>
                                        <td>{hop.type}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Card>
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
