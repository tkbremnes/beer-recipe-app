import React, { Component } from "react";

import "./style.css";

import Page from "../Page";
import Card from "../BruiCard";
import AbvCalculator from "../AbvCalculator";
import StrikeWaterCalculator from "../StrikeWaterCalculator";
import PrimingSugarCalculator from "../PrimingSugarCalculator";

class Calculators extends Component {
    render() {
        return (
            <Page>
                <Card header="ABV Calculator">
                    <AbvCalculator />
                </Card>

                <Card header="Strike water calculator">
                    <StrikeWaterCalculator />
                </Card>

                <Card header="Priming sugar calculator">
                    <PrimingSugarCalculator />
                </Card>
            </Page>
        )
    }
}

export default Calculators;
