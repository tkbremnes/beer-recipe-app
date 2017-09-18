import React, { Component } from "react";

import BeerStyle from '../../../bjcp/style.js';

import "./style.css";

class BeerStyleSelect extends Component {
    _handleOnChange(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <select
                onChange={ this._handleOnChange.bind(this) }
                className="BeerStyleSelect"
            >
                { BeerStyle.bjcp.getAll().map((_style) => {
                    const styleId = `bjcp:${_style.id}`;
                    return (
                        <option
                            key={ styleId }
                            value={ styleId }
                        >
                            { _style.id }: { _style.name }
                        </option>
                    );
                }) }
            </select>
        )
    }
}

export default BeerStyleSelect;