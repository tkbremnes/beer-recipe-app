import React, { Component } from "react";
import PropTypes from "prop-types";

import GravityInput from "../BruiSpecificGravityInput";
import Button from "../BruiButton";

import "./style.css";

class AdvancedGravityInput extends Component {
    constructor(props) {
        super(props);
        let displayValue = props.value + "";

        while (displayValue.length < 5) {
            displayValue += "0";
        }

        this.state = {
            value: props.value,
            displayValue: props.value + "",
        }
    }

    _increment() {
        const newValue = parseFloat((this.state.value + 0.001).toPrecision(4));
        let displayValue = newValue + "";
        while (displayValue.length < 5) {
            displayValue += "0";
        }

        this.setState({
            value: newValue,
            displayValue,
        });
        this.props.onChange(newValue);
    }

    _decrement() {
        if (this.state.value === 1.000) {
            return;
        }

        const newValue = parseFloat((this.state.value - 0.001).toPrecision(4));
        let displayValue = newValue + "";
        while(displayValue.length < 5) {
            displayValue += "0";
        }

        this.setState({
            value: newValue,
            displayValue,
        });
        this.props.onChange(newValue);
    }

    _handleIncrementStart = (ev) => {
        if (!this.props.onChange) {
            return;
        }

        this._increment();
        window.clearInterval(this._increaseInterval);
        this._clickHoldIncreaseDelay = window.setTimeout(() => {
            this._increaseInterval = window.setInterval(this._increment.bind(this), 150);
        }, 300);
    }

    _handleDecrementStart = (ev) => {
        if (!this.props.onChange) {
            return;
        }

        this._decrement();

        window.clearInterval(this._decreaseInterval);
        this._clickHoldDecreaseDelay =window.setTimeout(() => {
            this._decreaseInterval = window.setInterval(this._decrement.bind(this), 150);
        }, 300);
    }

    _handleIncrementEnd = (ev) => {
        window.clearInterval(this._increaseInterval);
        window.clearInterval(this._clickHoldIncreaseDelay);
    }

    _handleDecrementEnd = (ev) => {
        window.clearInterval(this._decreaseInterval);
        window.clearInterval(this._clickHoldDecreaseDelay);
    }

    _handleChange = (value, displayValue) => {
        this.setState({value, displayValue});
        this.props.onChange(value);
    }

    render() {
        const {
            displayValue,
        } = this.state;

        const {
            label,
        } = this.props;

        return (
            <div className="AdvancedGravityInput">
                <GravityInput
                    value={displayValue}
                    label={label}
                    onChange={this._handleChange}
                />

                <div className="button-wrapper">
                    <Button
                        onClick={() => {}}
                        onDown={ this._handleIncrementStart }
                        onUp={ this._handleIncrementEnd }
                    >+</Button>
                    <Button
                        onClick={() => { }}
                        onDown={ this._handleDecrementStart }
                        onUp={ this._handleDecrementEnd }
                    >-</Button>
                </div>
            </div>
        )
    }
}

AdvancedGravityInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.number,
}

export default AdvancedGravityInput;
