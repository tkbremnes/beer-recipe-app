import React, { Component } from 'react';
import PropTypes from "prop-types";

import BruiCard from "../../BruiCard";

class Hops extends Component {
    _renderHeader = () => {
        return (
            <thead>
                <tr>
                    <td className="weight"><brui-label-text></brui-label-text></td>
                    <td className="name"><brui-label-text></brui-label-text></td>
                    <td className="aa"><brui-label-text></brui-label-text></td>
                    <td className="time"></td>
                </tr>
            </thead>
        )
    }

    _renderBody = (_hops, batchSize) => {
        const dryHops = _hops.filter((hop) => {
            return hop.time === "DH";
        });

        const hops = _hops.filter((hop) => {
            return hop.time !== "DH";
        }).sort((a, b) => {
            return a.time < b.time;
        });

        function formatAa(_aa) {
            return (_aa * 100).toPrecision(2);
        }

        return (
            <tbody>
                {hops.map((hop, index) => {
                    const weight = Math.round(hop.amount * batchSize);
                    const time = hop.time;
                    const name = hop.hop.name;
                    const alpha_acids = hop.hop.alpha_acids;

                    return (
                        <tr key={`${index}-${hop.name}`}>
                            <td className="denom-cell weight">
                                <p className="text-content">
                                    {weight}<span className="denom">g</span>
                                </p>
                            </td>

                            <td>
                                <p className="text-content">
                                    {name}
                                </p>
                            </td>

                            <td className="denom-cell aa">
                                <p className="text-content">
                                    {formatAa(alpha_acids)}<span className="denom">%</span>
                                </p>
                            </td>

                            <td className="denom-cell time">
                                <p className="text-content">
                                    {time}<span className="denom">min</span>
                                </p>
                            </td>
                        </tr>
                    )
                })}

                {dryHops.map((hop, index) => {
                    const weight = hop.weight;
                    const name = hop.hop.name;
                    const aa = hop.hop.alpha_acids;

                    return (
                        <tr key={`${index}-${name}`} className="separator">
                            <td className="denom-cell weight">
                                <p className="text-content">
                                    {weight}<span className="denom">g</span>
                                </p>
                            </td>

                            <td>
                                <p className="text-content">
                                    {name}
                                </p>
                            </td>

                            <td className="denom-cell aa">
                                <p className="text-content">
                                    {formatAa(aa)}<span className="denom">%</span>
                                </p>
                            </td>

                            <td className="denom-cell">
                                <p className="text-content">
                                    DH
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
            hops,
            batchSize,
        } = this.props;

        return (
            <BruiCard header="Hops">
                <table className="zebra">
                    { this._renderHeader() }
                    { this._renderBody(this.props.hops, batchSize) }
                </table>
            </BruiCard>
        )
    }
}

Hops.propTypes = {
    hops: PropTypes.array.isRequired,
    batchSize: PropTypes.number.isRequired,
}

export default Hops;
