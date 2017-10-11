import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./style.css";

import BruiCard from "../../BruiCard";
import BruiButton from "../../BruiButton";
import Select from "Components/BruiSelect";

function FermentablesInputHeader() {
    return (
        <thead className="input-row">
            <tr>
                <td className="weight"><brui-label-text>Weight</brui-label-text></td>
                <td className="name"><brui-label-text>Name</brui-label-text></td>
                <td className="total"></td>
            </tr>
        </thead>
    )
}

class FermentablesInput extends Component {
    constructor(props) {
        super(props);

        const fermentables = props.fermentables.slice(0);

        if (fermentables.length === 0) {
            fermentables.push({
                fermentable: {},
                weight: "",
            });
        }

        this.state = {
            fermentables,
        };
    }

    static propTypes = {
        fermentables: PropTypes.array.isRequired,
    }

    addFermentable() {
        const fermentables = this.state.fermentables;
        fermentables.push({
            fermentable: {},
            weight: null,
        });

        this.setState({
            fermentables
        });

        requestAnimationFrame(() => {
            const focus = this._tableBody.querySelector("tr:last-child td:first-child input");
            focus.focus();
        });
    }

    _getRatio(itemWeight, total) {
        const ratio = (itemWeight || 0) / (total || 1);
        return Math.round(ratio * 100);
    }

    _removeFermentable(fermentable) {
        const newState = Object.assign({}, this.state);

        newState.fermentables = newState.fermentables.filter((_f) => {
            return fermentable.id !== _f.id;
        });

        this.setState(newState);
    }

    _emitOnChange(fermentables) {
        const exposedFermentables = fermentables.filter((_f) => {
            return _f.fermentable.name && _f.weight;
        });

        this.props.onChange(exposedFermentables);
    }

    _handleIngredientChange = (position, ingredient) => {
        const updatedFermentables = this.state.fermentables.slice();

        updatedFermentables[position].fermentable = ingredient;

        this.setState(updatedFermentables);
        this._emitOnChange(updatedFermentables);
    }

    _handleWeightChange = (position, event) => {
        const weight = event.target.value;

        const updatedFermentables = this.state.fermentables.slice();

        updatedFermentables[position].weight = weight;

        this.setState(updatedFermentables);
        this._emitOnChange(updatedFermentables);
    }

    render() {
        const {
            fermentables,
        } = this.state;

        const {
            fermentableIngredients,
        } = this.props;

        const totalFermentableWeight = fermentables.reduce((a, b) => {
            return a + parseInt(b.weight || 0, 10);
        }, 0);

        return (
            <div>
            <BruiCard
                header="Fermentables"
            >
                <table className="FermentablesInput InputTable">
                    <FermentablesInputHeader />

                    <tbody
                        ref={(tableBody) => {this._tableBody = tableBody}}
                    >
                        { fermentables.map((_fermentable, i) => {
                            const printRatio = this._getRatio(_fermentable.weight, totalFermentableWeight);

                            return (
                                <tr className="input-row" key={i}>
                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <input
                                                placeholder="1000"
                                                className="right-aligned-denom"
                                                type="tel"
                                                maxLength="5"
                                                value={ _fermentable.weight }
                                                onChange={ this._handleWeightChange.bind(null, i) }
                                            />
                                            <span className="denom">g</span>
                                        </div>
                                    </td>

                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <Select
                                                options={fermentableIngredients}
                                                name={"name"}
                                                onChange={this._handleIngredientChange.bind(null, i)}
                                            />
                                        </div>
                                    </td>

                                    <td className="total-cell"><p>{ printRatio }%</p></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div>
                    <BruiButton
                        onClick={ this.addFermentable.bind(this) }
                    >Add fermentable</BruiButton>
                </div>
            </BruiCard>

                <BruiCard>
                    <p className="FermentablesInput-totalWeight">
                        Total weight: { totalFermentableWeight } gram
                    </p>

                    <p className="FermentablesInput-totalWeight">
                        Color: ?
                    </p>
                </BruiCard>
            </div>
        )
    }
}

export default FermentablesInput;
