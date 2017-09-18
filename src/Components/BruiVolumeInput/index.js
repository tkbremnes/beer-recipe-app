import React, { Component } from 'react';

import "./style.css";

class BruiVolumeInput extends Component {
    _handleOnChange(event) {
        this.props.onChange(parseFloat(event.target.value));
    }

    render() {
        return (
            <label className="BruiVolumeInput">
                <span className="BruiVolumeInput-denom">L</span>

                <span className="BruiVolumeInput-labelText">{ this.props.label }</span>

                <input
                    className="BruiVolumeInput-input"
                    type="number"
                    value={ this.props.value }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

export default BruiVolumeInput;
