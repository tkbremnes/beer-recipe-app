import React, { Component } from 'react';
import PropTypes from "prop-types";

import BruiCard from "../../BruiCard";

import FermentableAddition from "../../../Model/FermentableAddition";

export default class Fermentables extends Component {
    _renderHeader = () => {
        return (
            <thead className="input-row">
                <tr>
                    <td className="weight"><brui-label-text></brui-label-text></td>
                    <td className="name"><brui-label-text></brui-label-text></td>
                    <td className="color"><brui-label-text></brui-label-text></td>
                    <td className="total"></td>
                </tr>
            </thead>
        )
    }

    _renderBody = (fermentables, totalWeight) => {
        return (
            <tbody>
                {fermentables.map((fermentableAddition, key) => {
                    const {
                        amount,
                        fermentable,
                    } = fermentableAddition;

                    const {
                        name,
                        color,
                    } = fermentable;

                    const printAmount = Math.round(amount * 100);
                    const weight = amount * totalWeight;
                    const printWeight = Math.round(weight);

                    return (
                        <tr key={key}>
                            <td className="denom-cell weight">
                                <p className="text-content">
                                    {printWeight}<span className="denom">g</span>
                                </p>
                            </td>

                            <td>
                                <p className="text-content">
                                    {name}
                                </p>
                            </td>

                            <td className="denom-cell color">
                                <p className="text-content">
                                    {color}<span className="denom">SRM</span>
                                </p>
                            </td>

                            <td className="denom-cell total">
                                <p className="text-content">
                                    {printAmount}<span className="denom">%</span>
                                </p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    render() {
        const {
            fermentables,
            totalGrainWeight,
        } = this.props;

        return (
            <BruiCard header="Fermentables">
                <table className="zebra">
                    {this._renderHeader()}
                    {this._renderBody(fermentables, totalGrainWeight)}
                </table>
            </BruiCard>
        )
    }

    static propTypes = {
        fermentables: PropTypes.arrayOf(PropTypes.instanceOf(FermentableAddition)),
        totalGrainWeight: PropTypes.number.isRequired,
    }
}
