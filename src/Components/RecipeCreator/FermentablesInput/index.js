import React, { Component } from 'react';

import "./style.css";

import BruiCard from "../../BruiCard";
import BruiButton from "../../BruiButton";

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

    fermentableChange(addition, field, event) {
        const fermentables = this.state.fermentables;

        const position = fermentables.findIndex((_f) => {
            return _f.id === addition.id;
        });

        addition.fermentable.color = field === "color" ? event.target.value : addition.fermentable.color;
        addition.fermentable.name = field === "name" ? event.target.value : addition.fermentable.name;

        const updatedAddition = {
            weight: field === "weight" ? event.target.value : addition.weight,
            fermentable: addition.fermentable,
            id: addition.fermentable.id
        };

        fermentables[position] = updatedAddition;

        this.setState({
            fermentables
        });

        const exposedFermentables = fermentables.filter((_f) => {
            return _f.fermentable.name && _f.weight;
        });

        this.props.onChange(exposedFermentables);
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

    render() {
        const {
            fermentables
        } = this.state;

        console.log(fermentables);

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
                        { fermentables.map((_fermentable) => {
                            const printRatio = this._getRatio(_fermentable.weight, totalFermentableWeight);

                            return (
                                <tr className="input-row" key={_fermentable.id}>
                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <input
                                                placeholder="1000"
                                                className="right-aligned-denom"
                                                type="tel"
                                                maxLength="5"
                                                value={ _fermentable.weight }
                                                onChange={ this.fermentableChange.bind(this, _fermentable, "weight") }
                                            />
                                            <span className="denom">g</span>
                                        </div>
                                    </td>

                                    <td className="input-cell">
                                        <div className="input-wrapper">
                                            <input
                                                placeholder="Maris Otter"
                                                type="text"
                                                value={ _fermentable.fermentable.name }
                                                onChange={ this.fermentableChange.bind(this, _fermentable, "name") }
                                            />
                                        </div>
                                    </td>

                                    <td className="input-cell color-cell">
                                        <div className="input-wrapper">
                                            <input
                                                placeholder="5"
                                                maxLength="3"
                                                type="tel"
                                                value={ _fermentable.fermentable.color }
                                                onChange={ this.fermentableChange.bind(this, _fermentable, "color") }
                                            />

                                            <span className="denom">EBC</span>
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
