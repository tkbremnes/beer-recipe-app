import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

import Page from "../Page";
import Card from "../BruiCard";

class Calculators extends Component {
    render() {
        return (
            <Page>
                <Card header="Calculators">
                    <ul className="Calculator-linkList">
                        <li><Link to="/calculators/alcohol">ABV calculator</Link></li>
                        <li><Link to="/calculators/strike_water">Strike water calculator</Link></li>
                        <li><Link to="/calculators/priming_sugar">Priming sugar calculator</Link></li>
                    </ul>
                </Card>
            </Page>
        )
    }
}

export default Calculators;
