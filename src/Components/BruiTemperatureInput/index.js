import React, { Component } from 'react';

import "./style.css";

class BruiTemperatureInput extends Component {
    _handleOnChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <label className="BruiTemperatureInput">
                <span className="BruiVolumeInput-denom">°C</span>

                <span className="BruiTemperatureInput-labelText">{ this.props.label }</span>

                <input
                    className="BruiTemperatureInput-input"
                    type="number"
                    value={ this.props.value }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

BruiTemperatureInput.propTypes = {

}

export default BruiTemperatureInput;
