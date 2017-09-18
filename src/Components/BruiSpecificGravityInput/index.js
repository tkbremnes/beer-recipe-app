import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./style.css";

class BruiSpecificGravityInput extends Component {
    componentWillMount() {
        const value = parseFloat(this.props.value) || 1;
        const displayValue = value.toPrecision(4).substring(2);

        this.setState({
            displayValue
        });
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value || 1;
        const displayValue = (value + "").substring(2);

        this.setState({
            displayValue
        });
    }

    _handleOnChange(event) {
        const parsedValue = parseFloat("1." + event.target.value, 10)
        const displayValue = "1." + event.target.value;
        this.setState({
            displayValue: event.target.value
        });

        this.props.onChange && this.props.onChange(parsedValue, displayValue);
    }

    render() {
        return (
            <label className="BruiSpecificGravityInput">
                <span className="BruiSpecificGravityInput-labelText">{ this.props.label }</span>
                <div className="BruiSpecificGravityInput-inputWrapper">
                    <span className="BruiSpecificGravityInput-pre">1.</span>
                    <input
                        className="BruiSpecificGravityInput-input"
                        type="tel"
                        value={ this.state.displayValue }
                        onChange={ this._handleOnChange.bind(this) }
                        maxLength="3"
                    />
                </div>
            </label>
        )
    }
}

BruiSpecificGravityInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
}

export default BruiSpecificGravityInput;
