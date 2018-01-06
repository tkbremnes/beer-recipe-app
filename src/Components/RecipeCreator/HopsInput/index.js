import React, { Component } from 'react';
import PropTypes from "prop-types";

import Card from "../../BruiCard";
import Button from "../../BruiButton";
import Select from "../../BruiSelect";
import WeightInput from "../../BruiWeightInput";
import TimeInput from "../../BruiTimeInput";

class HopsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hops: [],
        }
    }

    static propTypes = {
        hops: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props.hops) {
            const hops = nextProps.hops.slice(0);

            if (hops.length === 0) {
                hops.push({
                    hop: {},
                    weight: "",
                });
            }

            this.setState({
                hops,
            });
        }
    }

    addHop = () => {
        const hops = this.state.hops;
        hops.push({
            weight: 0,
            time: 0,
            hop: null,
        });

        this.setState({
            hops
        });
    }

    _emitChange = (hops) => {
        const exposedHops = hops.filter((hopAddition) => {
            return hopAddition.hop && hopAddition.weight > 0 && hopAddition.time > 0;
        });
        this.props.onChange(exposedHops);
    }

    _hopChanged = (index, hop) => {
        const hops = this.state.hops.slice(0);
        hops[index].hop = hop;

        this.setState({
            hops,
        });

        this._emitChange(hops);
    }

    _weightChanged = (index, weight) => {
        const hops = this.state.hops.slice(0);
        hops[index].weight = weight;

        this.setState({
            hops,
        });

        this._emitChange(hops);
    }

    _timeChanged = (index, time) => {
        const hops = this.state.hops.slice(0);
        hops[index].time = time;

        this.setState({
            hops,
        });

        this._emitChange(hops);
    }

    render() {
        const hops = this.state.hops;

        const {
            hopsIngredients,
        } = this.props;

        return (
            <div>
                    { hops.map((hopAddition, index) => {
                        return (
                            <Card key={index}>
                                <Select
                                    options={hopsIngredients}
                                    name="name"
                                    onChange={this._hopChanged.bind(this, index)}
                                    title="Select hop"
                                    selectedOption={hopAddition.hop}

                                />

                                <div>
                                    {hopAddition.hop && <p>{(hopAddition.hop.alpha_acids * 100).toPrecision(2)}% Alpha acids</p>}
                                </div>

                                <WeightInput
                                    onChange={this._weightChanged.bind(this, index)}
                                />

                                <TimeInput
                                    onChange={this._timeChanged.bind(this, index)}
                                />
                            </Card>
                        );
                    }) }

                    <div>
                        <Button
                            onClick={ this.addHop }
                        >Add hop</Button>
                    </div>


            </div>
        )
    }
}

export default HopsInput;
