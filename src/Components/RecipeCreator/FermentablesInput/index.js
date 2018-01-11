import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./style.css";

import BruiCard from "../../BruiCard";
import BruiButton from "../../BruiButton";
import Select from "Components/BruiSelect";

import FermentableAddition from "Model/FermentableAddition";

import calculateColor from "Utils/Calculators/calculateColor";

function FermentablesInputHeader() {
    return (
        <thead className="input-row">
            <tr>
                <td className="weight"><brui-label-text>Weight</brui-label-text></td>
                <td className="name"><brui-label-text>Name</brui-label-text></td>
                <td className="color input"><brui-label-text>Color</brui-label-text></td>
                <td className="total"></td>
            </tr>
        </thead>
    )
}

class FermentablesInput extends Component {
    static propTypes = {
        fermentables: PropTypes.array.isRequired,
    }

    state = {
        fermentables: [],
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps !== this.props.fermentables) {
        //     const fermentables = nextProps.fermentables.slice(0);

        //     if (fermentables.length === 0) {
        //         fermentables.push({
        //             fermentable: {},
        //             weight: "",
        //         });
        //     }

        //     this.setState({
        //         fermentables,
        //     });
        // }
    }

    addFermentable() {
        const fermentables = this.state.fermentables;
        fermentables.push({
            fermentable: {},
            amount: "",
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
            return _f.fermentable.name && _f.amount;
        });

        console.log(fermentables)

        this.props.onChange(exposedFermentables.map((addition) => {
            return new FermentableAddition({
                fermentable: addition.fermentable,
                amount: addition.amount,
            });
        }));
    }

    _handleIngredientChange = (position, ingredient) => {
        const updatedFermentables = this.state.fermentables.slice();

        updatedFermentables[position].fermentable = ingredient;

        this.setState(updatedFermentables);
        this._emitOnChange(updatedFermentables);
    }

    _handleWeightChange = (position, event) => {
        const amount = parseInt(event.target.value, 10);

        const updatedFermentables = this.state.fermentables.slice();

        updatedFermentables[position].amount = Number.isNaN(amount) ? "" : amount;

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
            return a + parseInt(b.amount || 0, 10);
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
                            const printRatio = this._getRatio(_fermentable.amount, totalFermentableWeight);

                            return (
                                <tr className="input-row" key={i}>
                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <input
                                                placeholder="1000"
                                                className="right-aligned-denom"
                                                type="tel"
                                                maxLength="5"
                                                value={ _fermentable.amount }
                                                onChange={ this._handleWeightChange.bind(null, i) }
                                            />
                                            <span className="denom">g</span>
                                        </div>
                                    </td>

                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <Select
                                                options={fermentableIngredients.sort((a, b) => {
                                                    if (a.name === b.name) {
                                                        return 0;
                                                    }
                                                    return a.name > b.name ? 1 : -1;
                                                })}
                                                name={"name"}
                                                onChange={this._handleIngredientChange.bind(null, i)}
                                                title="Select fermentable"
                                                selectedOption={_fermentable.fermentable.name && _fermentable.fermentable}
                                            />
                                        </div>
                                    </td>

                                    <td className="input-cell color-cell">
                                        <div className="input-wrapper">
                                            { _fermentable.fermentable.color !== undefined &&
                                                <p className="non-editable">
                                                    {_fermentable.fermentable.color}
                                                    <span className="denom">°L</span>
                                                </p>
                                            }
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
                </BruiCard>
            </div>
        )
    }
}

export default FermentablesInput;
