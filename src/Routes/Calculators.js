import React from "react";

import Calculators from "../Components/Calculators";
import AbvCalculator from "../Components/AbvCalculator";
import StrikeWaterCalculator from "../Components/StrikeWaterCalculator";
import PrimingSugarCalculator from "../Components/PrimingSugarCalculator";

import {
    Route,
    Switch
} from 'react-router-dom';

function CalculatorRoutes() {
    return (
        <Switch>
            <Route exact path="/calculators/" component={Calculators} />
            <Route exact path="/calculators/alcohol" component={AbvCalculator} />
            <Route exact path="/calculators/strike_water" component={StrikeWaterCalculator} />
            <Route exact path="/calculators/priming_sugar" component={PrimingSugarCalculator} />
        </Switch>
    );
}

export default CalculatorRoutes;
