import React, { Component } from "react";

import "./style.css";

import {
    getPrimingSugar
} from "../../Utils/priming_sugar_calculator.js";


import Page from "../Page";
import Card from "../BruiCard";
import BruiVolumeInput from "../BruiVolumeInput";
import BruiTemperatureInput from "../BruiTemperatureInput";

class PrimingSugarCalculator extends Component {
    componentWillMount() {
        this.setState({
            packageVolume: undefined,
            co2Volume: undefined,
            beverageTemperature: undefined
        });
    }

    _calculate() {
        return getPrimingSugar(
            this.state.packageVolume || 0,
            this.state.co2Volume || 0,
            this.state.beverageTemperature || 0
        ) || 0;
    }

    _handlePackageVolumeChange(value) {
        this.setState({
            packageVolume: value
        });
    }

    _handleCo2VolumeChange(value) {
        this.setState({
            co2Volume: value
        });
    }

    _handleTemperatureChange(value) {
        this.setState({
            beverageTemperature: value
        });
    }


    render() {
        const calculatedValue = Math.round(this._calculate(this.state));

        return (
            <Page>
                <Card header="Priming sugar calculator">
                    <Card>
                        <BruiVolumeInput
                            label="Package volume"
                            value={ this.state.packageVolume }
                            onChange={ this._handlePackageVolumeChange.bind(this) }
                        />

                        <BruiVolumeInput
                            label="CO² volume"
                            value={ this.state.co2Volume }
                            onChange={ this._handleCo2VolumeChange.bind(this) }
                        />

                        <BruiTemperatureInput
                            label="Temperature of beverage"
                            value={ this.state.beverageTemperature }
                            onChange={ this._handleTemperatureChange.bind(this) }
                        />
                    </Card>

                    <Card header="Priming sugar">
                        { calculatedValue } grams table sugar
                    </Card>
                </Card>
            </Page>
        )
    }
}

export default PrimingSugarCalculator;
