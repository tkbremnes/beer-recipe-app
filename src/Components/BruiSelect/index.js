import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

class BruiSelect extends Component {
    _handleChange = (ev) => {
        this.props.onChange(this.props.options[ev.target.value]);
    }

    render () {
        const {
            options,
            name
        } = this.props;

        return (
            <select onChange={this._handleChange}>
                {options.map((option, i) =>  {
                    return (
                        <option
                            key={i}
                            value={i}
                        >{option[name]}</option>
                    )
                })}
            </select>
        );
    }
}

BruiSelect.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default BruiSelect;
