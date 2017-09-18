import React, { Component } from "react";

import "./style.css";

class BruiUrlInput extends Component {
    _handleOnChange(event) {
        if (!this.props.onChange) {
            return;
        }

        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <label className="BruiUrlInput">
                <span className="BruiUrlInput-labelText">{ this.props.label }</span>
                <input
                    className="BruiUrlInput-input"
                    type="text"
                    value={ this.props.value }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

export default BruiUrlInput;
