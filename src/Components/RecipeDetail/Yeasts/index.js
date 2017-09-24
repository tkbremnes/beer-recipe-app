import React, { Component } from 'react';
import PropTypes from "prop-types";

import BruiCard from "../../BruiCard";

class Yeasts extends Component {
    _renderHeader = () => {
        return (
            <thead>
                <tr>
                    <td className="id"></td>
                    <td className="name"></td>
                </tr>
            </thead>
        )
    }

    _renderBody = (yeasts) => {
        return (
            <tbody>
                {yeasts.map((_y, index) => {
                    const name = _y.yeast.name;
                    const id = _y.yeast.product_id;

                    return (
                        <tr key={`${index}-${name}`}>
                            <td><p className="text-content">{id}</p></td>
                            <td><p className="text-content">{name}</p></td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    render() {
        const {
            yeasts,
        } = this.props;

        const title = yeasts.length === 1 ? 'Yeast' : 'Yeasts';

        return (
            <BruiCard header={title}>
                <table className="zebra">
                    {this._renderHeader()}
                    {this._renderBody(this.props.yeasts)}
                </table>
            </BruiCard>
        )
    }
}

Yeasts.propTypes = {
    yeasts: PropTypes.array.isRequired,
}

export default Yeasts;
