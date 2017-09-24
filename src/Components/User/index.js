import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.css";


import {
    getSettings,
} from '../../Actions';

import Page from "../Page";
import Card from "../BruiCard";
import TextInput from "../BruiTextInput";

class User extends Component {
    componentWillMount() {
        console.log(2)

        this.props.dispatch(getSettings());
    }
    render() {
        if (!this.props.settings.breweryName) {
            return null;
        }

        return (
            <Page>
                <Card header="User">
                    <TextInput
                        label="Brewer name"
                        value={this.props.settings.displayName}
                    />

                    <img
                        alt="Brewery logo"
                        src={ window.URL.createObjectURL(this.props.settings.breweryLogo)}
                    />
                </Card>

                <Card header="Settings">
                    <Card header="Measuring units">
                        <label>
                            Metric
                            <input type="radio" />
                        </label>

                        <label>
                            Imperial
                            <input type="radio" />
                        </label>
                    </Card>

                    <Card header="Gravity">
                        <label>
                            ° Plato
                            <input type="radio" />
                        </label>

                        <label>
                            Specific gravity
                            <input type="radio" />
                        </label>
                    </Card>

                    <Card header="Color">
                        <label>
                            EBC
                            <input type="radio" />
                        </label>

                        <label>
                            SRM
                            <input type="radio" />
                        </label>

                        <label>
                            ° Lovibond
                            <input type="radio" />
                        </label>
                    </Card>

                    <Card header="Bitterness">
                        <label>
                            IBU
                            <input type="radio" />
                        </label>

                        <label>
                            EBU
                            <input type="radio" />
                        </label>
                    </Card>
                </Card>
            </Page>
        )
    }
}

function select(state) {
    return {
        settings: state.settings,
    }
}

export default connect(select)(User);
