import React, { Component } from 'react';

import BruiCard from "../../BruiCard";
import BruiTextInput from "../../BruiTextInput";
import VolumeInput from "../../BruiVolumeInput";

import BeerStyleSelect from '../BeerStyleSelect';

const metaModel = {
    name: "",
    source: "",
    style: "",
    batch_volume: ""
}

class MetaInput extends Component {
    componentWillMount() {
        this.setState({
            meta: metaModel
        });
    }

    _handleOnChange = (type, value) => {
        const updatedMeta = Object.assign({}, this.state.meta);
        updatedMeta[type] = value;

        this.setState({
            meta: updatedMeta
        });

        this.props.onChange(updatedMeta);
    }

    _handleBeerStyleChange = (beerStyle) => {
        const updatedMeta = Object.assign({} , this.state.meta);
        updatedMeta["style"]  = beerStyle;

        this.setState({
            meta: updatedMeta,
        });

        this.props.onChange(updatedMeta);
    }

    render() {
        const {
            name,
            source,
            batch_volume,
            style
        } = this.state.meta;

        return (
            <BruiCard>
                <BruiTextInput
                    label="Name"
                    value={ name }
                    onChange={ this._handleOnChange.bind(this, 'name') }
                />

                <BeerStyleSelect
                    value={ style }
                    onChange={ this._handleBeerStyleChange }
                />

                <VolumeInput
                    label="Batch volume"
                    value={ batch_volume }
                    onChange={ this._handleOnChange.bind(this, 'batch_volume') }
                />
                <BruiTextInput
                    label="Source"
                    value={ source }
                    onChange={ this._handleOnChange.bind(this, 'source') }
                />
            </BruiCard>
        )
    }
}

export default MetaInput;
