import React, { Component } from 'react';
import PropTypes from "prop-types";

import BruiCard from "../../BruiCard"

class Description extends Component {
    _handleChange(ev) {
        const body = ev.target.value;
        const value = {
            body,
        }
        this.props.onChange(value);
    }

    render() {
        return (
            <BruiCard
                header="Description"
            >
                <textarea
                    onChange={ this._handleChange.bind(this) }
                    value={ this.props.description }>
                </textarea>
            </BruiCard>
        )

    }
}

Description.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default Description;
