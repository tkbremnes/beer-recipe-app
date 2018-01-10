import React, { Component } from "react";

import "./style.css";

import {
    getStrikeWaterTemperature
} from "../../Utils/strike_water_calculator.js";


import Page from "../Page";
import Card from "../BruiCard";
import BruiWeightInput from "../BruiWeightInput";
import BruiTemperatureInput from "../BruiTemperatureInput";
import BruiVolumeInput from "../BruiVolumeInput";

class StrikeWaterCalculator extends Component {
    componentWillMount() {
        this.setState({
            grainWeight: undefined,
            firstRestTemperature: undefined,
            strikeWaterVolume: undefined,
            grainTemperature: undefined,
            boilingTemperature: 100,
        });
    }

    _handleGrainWeightChange(value) {
        this.setState({
            grainWeight: value
        });
    }

    _handleFirstRestTemperatureChange(value) {
        this.setState({
            firstRestTemperature: value
        });
    }

    _handleStrikeWaterVolumeChange(value) {
        this.setState({
            strikeWaterVolume: value
        });
    }

    _handleGrainTemperatureChange(value) {
        this.setState({
            grainTemperature: value
        });
    }

    _handleBoilingTemperatureChange(value) {
        this.setState({
            boilingTemperature: value
        });
    }

    _calculate({grainWeight, strikeWaterVolume, grainTemperature, firstRestTemperature}) {
        return getStrikeWaterTemperature(
            parseInt(grainWeight || 0, 10),
            parseFloat(strikeWaterVolume || 0),
            parseInt(grainTemperature || 0, 10),
            parseInt(firstRestTemperature || 0, 10)
        ) || 0;
    }

    render() {
        const calculatedTemperature = Math.round(this._calculate(this.state));

        return (
            <Page>
                <Card header="Strike water calculator">
                    <Card>
                        <BruiWeightInput
                            label="Grain weight"
                            onChange={ this._handleGrainWeightChange.bind(this) }
                            value={ this.state.grainWeight }
                        />

                        <BruiTemperatureInput
                            label="First rest temperature"
                            onChange={ this._handleFirstRestTemperatureChange.bind(this) }
                            value={ this.state.firstRestTemperature }
                        />

                        <BruiVolumeInput
                            label="Strike water volume"
                            onChange={ this._handleStrikeWaterVolumeChange.bind(this) }
                            value={ this.state.strikeWaterVolume }
                        />

                        <BruiTemperatureInput
                            label="Grain temperature"
                            onChange={ this._handleGrainTemperatureChange.bind(this) }
                            value={ this.state.grainTemperature }
                        />

                        <BruiTemperatureInput
                            label="Boiling temperature"
                            onChange={ this._handleBoilingTemperatureChange.bind(this) }
                            value={ this.state.boilingTemperature }
                        />
                    </Card>
                    <Card header="Strike water temperature">
                        <p>{ calculatedTemperature }°C</p>
                    </Card>
                </Card>
            </Page>
        );
    }
}

export default StrikeWaterCalculator;
