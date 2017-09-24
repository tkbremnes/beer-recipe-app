import React from "react";

import Calculators from "../Components/Calculators";

import {
    Route,
    Switch
} from 'react-router-dom';

function CalculatorRoutes() {
    return (
        <Switch>
            <Route exact path="/calculators/" component={Calculators} />
        </Switch>
    );
}

export default CalculatorRoutes;
