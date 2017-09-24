import React, { Component } from 'react';
import PropTypes from "prop-types";

import Hop from "../../../Model/Hop";

import BruiCard from "../../BruiCard";
import BruiButton from "../../BruiButton";

class HopsInputHeader extends Component {
    render() {
        return (
            <thead className="input-row">
                <tr>
                    <td className="weight"><brui-label-text>Weight</brui-label-text></td>
                    <td className="name"><brui-label-text>Name</brui-label-text></td>
                    <td className="aa"><brui-label-text>AA</brui-label-text></td>
                    <td className="time"><brui-label-text>Time</brui-label-text></td>
                </tr>
            </thead>
        )
    }
}

class HopsInput extends Component {
    static propTypes = {
        hops: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    componentWillMount() {
        const hops = this.props.hops.slice(0);

        if (hops.length === 0) {
            hops.push({
                weight: "",
                time: 0,
                hop: new Hop()
            });
        }

        this.setState({
            hops,
        })
    }

    hopChange(hop, field, event) {
        const hops = this.state.hops;

        const position = hops.findIndex((_hop) => {
            return _hop.id === hop.id;
        });

        const updatedHop = {
            weight: field === "weight" ? event.target.value : hop.weight,
            name: field === "name" ? event.target.value : hop.name,
            alpha_acids: field === "alpha_acids" ? (event.target.value / 100) : hop.alpha_acids,
            time: field === "time" ? event.target.value : hop.time,
            id: hop.id
        };

        hops[position] = updatedHop;
        this.setState({hops});

        const exposedHops = hops.filter((_h) => {
            return _h.weight && _h.name && _h.time;
        }).map((_h) => {
            return {
                weight: _h.weight,
                time: _h.time,
                hop: {
                    name: _h.name,
                    alpha_acids: _h.alpha_acids,
                },
            }
        });

        this.props.onChange(exposedHops);
    }

    addHop = () => {
        const hops = this.state.hops;
        hops.push(new Hop());

        this.setState({
            hops
        });
    }

    render() {
        const hops = this.state.hops;

        return (
            <div>
                <BruiCard
                    header="Hops"
                >
                    <table className="InputTable hop-input-table">
                        <HopsInputHeader />

                        <tbody>
                            { hops.map((_hop) => {
                                const printAa = _hop.hop.alpha_acids ? Math.round(_hop.hop.alpha_acids * 100) : undefined;
                                return (
                                    <tr className="input-row" key={_hop.id}>
                                        <td className="input-cell">
                                            <div className="input-wrapper">
                                                <input
                                                    placeholder="32"
                                                    className="right-aligned-denom"
                                                    type="tel"
                                                    maxLength="5"
                                                    value={ _hop.weight }
                                                    onChange={ this.hopChange.bind(this, _hop, "weight") }
                                                />
                                                <span className="denom">g</span>
                                            </div>
                                        </td>

                                        <td className="input-cell">
                                            <div className="input-wrapper">
                                                <input
                                                    placeholder="Fuggles"
                                                    type="text"
                                                    value={ _hop.hop.name }
                                                    onChange={ this.hopChange.bind(this, _hop, "name") }
                                                />
                                            </div>
                                        </td>

                                        <td className="input-cell aa-cell">
                                            <div className="input-wrapper">
                                                <input
                                                    placeholder="5"
                                                    maxLength="2"
                                                    type="tel"
                                                    className="right-aligned-denom"
                                                    value={ printAa }
                                                    onChange={this.hopChange.bind(this, _hop, "alpha_acids") }
                                                />
                                                <span className="denom">%</span>
                                            </div>
                                        </td>

                                        <td className="input-cell time-cell">
                                            <div className="input-wrapper">
                                                <input
                                                    placeholder="5"
                                                    maxLength="3"
                                                    className="right-aligned-denom"
                                                    type="tel"
                                                    value={ _hop.time }
                                                    onChange={ this.hopChange.bind(this, _hop, "time") }
                                                    />
                                                <span className="denom">min</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>

                </BruiCard>

                <div>
                    <BruiButton
                        onClick={ this.addHop }
                    >Add hop</BruiButton>
                </div>

            </div>
        )
    }
}

export default HopsInput;
