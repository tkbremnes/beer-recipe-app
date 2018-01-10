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
                        <li>
                            <Link to="/calculators/alcohol">
                                <Card header="ABV calculator">
                                    Estimates the alcohol contents of the fluid, using original and final gravity.
                                </Card>
                            </Link>
                        </li>

                        <li>
                            <Link to="/calculators/strike_water">
                                <Card header="Strike water calculator">
                                    Calculates temperature of water.
                                </Card>
                            </Link>
                        </li>

                        <li>
                            <Link to="/calculators/priming_sugar">
                                <Card header="Priming sugar calculator">
                                    Calculates amount of sugar needed for carbonation.
                                </Card>
                            </Link>
                        </li>
                    </ul>
                </Card>
            </Page>
        )
    }
}

export default Calculators;
