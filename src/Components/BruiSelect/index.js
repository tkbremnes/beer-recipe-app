import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

class BruiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
        }
    }
    _handleChange = (ev) => {
        const selectedOption = this.props.options[ev.target.value];
        this.setState(selectedOption);
        this.props.onChange(selectedOption);
    }

    render () {
        const {
            options,
            name,
            title,
            selectedOption,
        } = this.props;

        return (
            <label className="BruiSelect">
                <select className="select" onChange={this._handleChange}>
                    {options.map((option, i) =>  {
                        return (
                            <option
                                key={i}
                                value={i}
                            >{option[name]}</option>
                        )
                    })}
                </select>

                {
                    selectedOption ?
                        <p className="selected-option text">{selectedOption.name}</p> :
                        <p className="placeholder text">{title}</p>
                }

                <div className="caret">
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                        <path d="M0-.75h24v24H0z" fill="none" />
                    </svg>
                </div>
            </label>
        );
    }
}

BruiSelect.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    selectedOption: PropTypes.object,
}

export default BruiSelect;
