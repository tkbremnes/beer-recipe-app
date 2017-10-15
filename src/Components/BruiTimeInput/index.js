import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./style.css";

// internal representation is minutes. Consider making it ms.
class BruiTimeInput extends Component {
    componentWillMount() {
        let displayValue;
        const inputValue = this.props.value;

        if (!inputValue) {
            return this.setState({
                displayValue: "",
            });
        }

        switch(this.props.type) {
            case "days": {
                displayValue = inputValue * 60 * 24;
                break;
            }

            case "hours": {
                displayValue = inputValue * 60;
                break;
            }

            case "minutes":
            default: {
                displayValue = inputValue;
            }
        }

        this.setState({
            displayValue,
        });
    }

    _handleOnChange(event) {
        let externalRepresentation;
        const inputValue = parseInt(event.target.value, 10);
        switch(this.props.type) {
            case "days": {
                externalRepresentation = inputValue * 60 * 24;
                break;
            }

            case "hours": {
                externalRepresentation = inputValue * 60;
                break;
            }

            case "minutes":
            default: {
                externalRepresentation = inputValue;
            }
        }
        this.setState({
            displayValue: inputValue
        });

        this.props.onChange(
            externalRepresentation,
        );
    }

    render() {
        const type = this.props.type || "minutes";
        const displayValue = this.state.displayValue;

        return (
            <label className="BruiTimeInput">
                <span className="BruiVolumeInput-denom">{ type }</span>

                <span className="BruiTimeInput-labelText">{ this.props.label }</span>
                <input
                    className="BruiTimeInput-input"
                    type="number"
                    value={ displayValue }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

BruiTimeInput.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default BruiTimeInput;
