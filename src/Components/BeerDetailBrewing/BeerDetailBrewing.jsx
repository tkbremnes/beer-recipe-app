import React from 'react';
import { connect } from 'react-redux';

import strikeWaterCalculator from '../../Utils/strike_water_calculator.js';
import RecipeItem from '../RecipeItem/RecipeItem.jsx';
import SpecificGravityInput from '../SpecificGravityInput/SpecificGravityInput.jsx';

import VolumeInput from '../VolumeInput/VolumeInput.jsx';
import TemperatureInput from '../TemperatureInput';
import WeightInput from '../WeightInput/WeightInput.jsx';
import TimeInput from '../BruiTimeInput.jsx';

import { storeBeerData } from '../../Utils/Actions';

function getTotalGrainWeight(_fermentables) {
    if (!_fermentables || _fermentables.length === 0) {
        return 0;
    }

    let res = 0;
    _fermentables.forEach((_f) => {
        res += parseInt(_f.weight);
    });
    return res;
}

function getStrikeTemp(totalGrainWeight, waterAmount, grainTemp, targetTemperature) {
    console.log(totalGrainWeight, waterAmount, grainTemp, targetTemperature);

    const initialTemp = parseInt(grainTemp);
    const targetTemp = parseInt(targetTemperature);
    return strikeWaterCalculator.getStrikeWaterTemperature(totalGrainWeight, waterAmount, initialTemp, targetTemp).toPrecision(3);
}

class BeerDetailBrewing extends React.Component {
    onGravityChanged(value) {
        this.setState({
            og: value
        });
    }

    updateBeerMeta(field, value) {
        this.props.dispatch({
            type: 'update_beer_meta',
            field,
            value
        })
    }

    doneBrewing() {
        storeBeerData(this.props.beer.id, {
            label: 'og',
            // value: this.state.og
        }).then(this.props.onDone);
    }

    render() {
        if (!(this.props.beer && this.props.beer.recipe)) {
            return <brui-loader-card></brui-loader-card>
        }

        console.log(this.props.beer)

        const recipe = this.props.beer.recipe;

        const totalGrainWeight = recipe.mashing_grain_weight || getTotalGrainWeight(recipe.fermentables);
        const grainTemp = recipe.mashing_grain_temperature || 18;
        const mashTemp = recipe.mashSchedule[0].temperature;
        const liquorAmount = recipe.strike_water_volume || Math.round((totalGrainWeight/1000) * 3);
        const strikeTemp = getStrikeTemp(totalGrainWeight, liquorAmount, grainTemp, mashTemp);

        function renderHopSchedule(hops) {
            return <div>
                <brui-card-header>Hop schedule</brui-card-header>
                <table>
                    <tbody>
                        { hops
                            .sort((a, b) => { return a.time < b.time })
                            .map((hop) => {
                            return <tr>
                                <td>{ hop.time }min</td>
                                <td>{ hop.name } ({ hop.aa }%)</td>
                            </tr>
                        }) }
                    </tbody>
                </table>
            </div>
        }

        return (
            <div>
            <brui-card-container>
                <brui-card>
                    <RecipeItem recipe={ recipe } />
                </brui-card>

                <brui-card>
                    <brui-card-header>Heat strike water</brui-card-header>

                    <VolumeInput
                        label="Strike water volume"
                        value={ liquorAmount }
                        onChange={ this.updateBeerMeta.bind(this, 'strike_water_volume') }
                    ></VolumeInput>

                    <TemperatureInput
                        label="Target mash temp."
                        value={ recipe.mashSchedule[0].temperature }
                        onChange={ this.updateBeerMeta.bind(this, 'mashing_temperature') }
                    ></TemperatureInput>

                    <TemperatureInput
                        label="Grain temp."
                        value={ grainTemp }
                        onChange={ this.updateBeerMeta.bind(this, 'mashing_grain_temperature') }
                    ></TemperatureInput>

                    <WeightInput
                        label="Grain weight"
                        // onChange={ this.updateBeerMeta.bind(this, 'mashing_grain_weight') }
                        value={ totalGrainWeight }
                    ></WeightInput>

                    <p>Heat { liquorAmount } liter water to { strikeTemp }°C</p>

                    <brui-button>Add note</brui-button>
                    <brui-button>Done!</brui-button>
                </brui-card>

                <brui-card>
                    <brui-card-header>Mash</brui-card-header>
                    <p>{ recipe.mashSchedule[0].temperature }°C for { recipe.mashSchedule[0].time } minutes</p>
                    <p>Target preboil gravity: { recipe.bg || "?" }</p>

                    <SpecificGravityInput
                        label="Actual preboil gravity"
                        value={ recipe.bg }
                        onChange={ this.updateBeerMeta.bind(this, 'specific_gravity_preboil') }
                    ></SpecificGravityInput>

                    <VolumeInput
                        label="First wort volume"
                        onChange={ this.updateBeerMeta.bind(this, 'mashing_first_wort_volume') }
                    ></VolumeInput>

                    <VolumeInput
                        label="Sparge water volume"
                        onChange={ this.updateBeerMeta.bind(this, 'sparging_waterVolume') }
                    ></VolumeInput>

                    <VolumeInput
                        label="Preboil volume"
                        onChange={ this.updateBeerMeta.bind(this, 'preboil_volume') }
                    ></VolumeInput>

                    <brui-button>Add note</brui-button>
                    <brui-button>Done!</brui-button>
                </brui-card>

                <brui-card>
                    <brui-card-header>Boil</brui-card-header>
                    <p>{ recipe.boilTime } minutes</p>
                    <p>Target postboil gravity: { recipe.og }</p>

                    { renderHopSchedule(recipe.hops) }

                    <TimeInput
                        label="Actual boil time"
                        onChange={ this.updateBeerMeta.bind(this, 'boil_time') }
                    ></TimeInput>

                    <VolumeInput
                        label="Postboil volume"
                        onChange={ this.updateBeerMeta.bind(this, 'postboil_volume') }
                    ></VolumeInput>

                    <brui-button>Add note</brui-button>
                    <brui-button>Done!</brui-button>
                </brui-card>

                <brui-card>
                    <p>Add yeast and measure.</p>
                    <SpecificGravityInput
                        onChange={ this.onGravityChanged.bind(this) }
                        label="OG"
                    ></SpecificGravityInput>

                    <VolumeInput
                        label="Total volume"
                    ></VolumeInput>

                    <brui-button
                        onClick={ this.doneBrewing.bind(this) }
                    >Super done</brui-button>
                </brui-card>
            </brui-card-container>
            </div>
        )
    }
}

function select(state) {
    return {
        beerDraft: state.beerDraft
    }
}

export default connect(select)(BeerDetailBrewing);
