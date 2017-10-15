import React, { Component } from 'react';

import "./style.css";

class BruiWeightInput extends Component {
    _handleOnChange(event) {
        this.props.onChange(parseInt(event.target.value, 10));
    }

    render() {
        return (
            <label className="BruiWeightInput">
                <span className="BruiWeightInput-labelText">{ this.props.label }</span>

                <input
                    className="BruiWeightInput-input"
                    type="number"
                    value={ this.props.value }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

export default BruiWeightInput;
