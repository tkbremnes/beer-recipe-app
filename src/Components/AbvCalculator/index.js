import React, { Component } from "react";

import "./style.css";

import Card from "../BruiCard";
import Page from "../Page";
import AdvancedGravityInput from "../AdvancedGravityInput";

import {
    calculateAbv,
    calculateAbw,
    calculateApparentAttenuation,
    calculateCalories,
} from "../../Utils/abv_calculator";

class AbvCalculator extends Component {
    state = {
        originalGravity: 1.054,
        finalGravity: 1.012
    }

    _handleOriginalGravityChange(value) {
        this.setState({
            originalGravity: value
        });
    }

    _handleFinalGravityChange(value) {
        this.setState({
            finalGravity: value
        });
    }

    _formatAbv(_abv) {
        return (_abv * 100).toPrecision(2);
    }

    render() {
        const {
            originalGravity,
            finalGravity
        } = this.state;

        const abv = this._formatAbv(calculateAbv(originalGravity, finalGravity));
        const abw = this._formatAbv(calculateAbw(originalGravity, finalGravity));
        const attenuation = this._formatAbv(calculateApparentAttenuation(originalGravity, finalGravity));
        const calories = Math.round(calculateCalories(originalGravity, finalGravity));

        return (
            <Page>
                <Card header="Alcohol calculator">
                    <Card header="Original gravity">
                        <AdvancedGravityInput
                            value={ originalGravity }
                            onChange={ this._handleOriginalGravityChange.bind(this) }
                        />
                    </Card>

                    <Card header="Final gravity">
                        <AdvancedGravityInput
                            value={ finalGravity }
                            onChange={ this._handleFinalGravityChange.bind(this) }
                        />
                    </Card>
                </Card>

                <Card header="Alcohol contents">
                    <p>ABV: { abv }%</p>
                    <p>ABW: { abw }%</p>
                    <p>Attenuation: { attenuation }%</p>
                    <p>Calories: { calories }kcal per liter</p>
                </Card>
            </Page>
        )
    }
}

export default AbvCalculator;
