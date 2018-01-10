import React, { Component } from "react";

import "./style.css";

import Card from "../BruiCard";
import Page from "../Page";
import AdvancedGravityInput from "../AdvancedGravityInput";

import {
    calculateAbv
} from "../../Utils/abv_calculator";

class AbvCalculator extends Component {
    state = {
        originalGravity: 1.000,
        finalGravity: 1.000
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
                    <p>Abv: { abv }%</p>
                </Card>
            </Page>
        )
    }
}

export default AbvCalculator;
