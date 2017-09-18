import React, { Component } from "react";

import "./style.css";

class BruiTextInput extends Component {
    _handleOnChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <label className="BruiTextInput">
                <span className="BruiTextInput-labelText">{ this.props.label }</span>
                <input
                    className="BruiTextInput-input"
                    type="text"
                    value={ this.props.value }
                    onChange={ this._handleOnChange.bind(this) }
                />
            </label>
        )
    }
}

export default BruiTextInput;