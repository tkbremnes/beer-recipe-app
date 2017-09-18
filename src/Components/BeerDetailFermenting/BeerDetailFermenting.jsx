import React from 'react';
import moment from 'moment';

import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';
import RecipeItem from '../RecipeItem/RecipeItem.jsx';

import {
    saveFermentationGravityMeasurement,
    storeBeerData,
    fetchFermentationGravityMeasurements
} from '../../Utils/Actions';

import abvCalculator from '../../Utils/abv_calculator.js';

import GravityMeasurementModal from '../GravityMeasurementModal/GravityMeasurementModal.jsx';

class BeerDetailFermenting extends React.Component {
    componentWillMount() {
        this.setState({
            timestamp: moment(moment.now()).format('YYYY-MM-DD'),
            isGravityMeasurementModalOpened: false
        });
    }

    onDateChange(value) {
        this.setState({
            timestamp: value,
        })
    }

    onDone() {
        const SERVING_TYPES = {
            CAN: 'can',
            KEG: 'keg',
            BOTTLE: 'bottle'
        }
        const beerId = this.props.beer.id;

        const doneDate = moment(this.state.timestamp).valueOf();
        const servingType = SERVING_TYPES.KEG; // TODO

        storeBeerData(beerId, {
            label: 'servingType',
            value: servingType
        }).then(() => {
            return storeBeerData(beerId, {
                label: 'tapped',
                value: doneDate
            });
        }).then(() => {
            return storeBeerData(beerId, {
                label: 'fg',
                value: 1.000
            });
        }).then(this.props.onDone);

        // this.props.onDone();
    }

    openGravityMeasurementModal() {
        this.setState({
            isGravityMeasurementModalOpened: true
        });
    }

    closeGravityMeasurementModal() {
        this.setState({
            isGravityMeasurementModalOpened: false
        });
    }

    recordGravity(measurement) {
        saveFermentationGravityMeasurement(this.props.beer.id, measurement);
        this.setState({
            fg: measurement.gravity
        });
        this.closeGravityMeasurementModal();
    }

    render() {
        if (!this.props.beer) {
            return <brui-loader-card></brui-loader-card>
        }

        function renderGravityMeasurementModal() {
            if (this.state && this.state.isGravityMeasurementModalOpened) {
                let lastMeasuredGravity
                if (!this.state.gravityMeasurements || this.state.gravityMeasurements.length === 0) {
                    lastMeasuredGravity = this.props.beer.og;
                }
                else {
                    lastMeasuredGravity = this.state.gravityMeasurements[this.state.gravityMeasurements.length -1].gravity;
                }

                return <GravityMeasurementModal
                    currentMeasurement={ lastMeasuredGravity }
                    onSave={ this.recordGravity.bind(this) }
                    onCancel={ this.closeGravityMeasurementModal.bind(this) }
                />
            }
        }

        const originalGravity = 1.054;
        // const recipe = this.props.beer.recipe;
        const beer = this.props.beer;
        const recipe = beer.recipe;

        // const gravityMeasurements = this.state.gravityMeasurements;

        // const gravityMeasurements = [];
        //     var lol = [{
        const gravityMeasurements = [{
                gravity: 1.040,
                timestamp: 1470780000000,
                id: "c0ae522d-5424-424a-b750-2227c41ad9b8",
            },
            {
                gravity: 1.035,
                timestamp: 1470952800000,
                id: "f23322a7-32a6-438c-b1f5-c1b97348f19c",
            },
            {
                gravity: 1.015,
                timestamp: 1472508000000,
                id: "5851c150-b4f0-4c22-9961-2e14b818f4f1",
            },
            {
                gravity: 1.010,
                timestamp: 1472680800000,
                id: "9a6d36f7-e4f7-4418-9652-73a7d9f95832",
            },
            {
                gravity: 1.010,
                timestamp: 1472853600000,
                id: "3dc439b2-eb9d-47ee-a42d-9676f5ab098c",
            },
        ]

        window.beerRefId = '3d265bc0-577e-44f3-a43f-e6d7a6292cef';

        const gravityMeasurementRel = [
            'c0ae522d-5424-424a-b750-2227c41ad9b8',
            'f23322a7-32a6-438c-b1f5-c1b97348f19c',
            '5851c150-b4f0-4c22-9961-2e14b818f4f1',
            '9a6d36f7-e4f7-4418-9652-73a7d9f95832',
            '3dc439b2-eb9d-47ee-a42d-9676f5ab098c'
        ]

        const brewdayGravityMeasurement = this.props.beer.original_gravity || this.props.beer.fermentation_gravity_measurements[0].specific_gravity;

        function renderFermentationMeasurements(_measurements) {
            function getAbvFromGravity(originalGravity, currentMeasuredGravity) {
                return abvCalculator.getAbv(originalGravity, currentMeasuredGravity);
            }

            function formatAbv(abv) {
                if (abv === 0) {
                    return '–';
                }

                return (abv * 100).toPrecision(2) + '%';
            }

            const sortedMeasurements = _measurements.sort((a, b) => {
                return a.timestamp > b.timestamp;
            });

            let isLikelyDone = false;

            if (sortedMeasurements.length >= 2) {
                // Compare the two latest measurements. If they are sufficently
                // apart, and have the same measurement – the beer is likely
                // done.
                // Or fermentation has stalled. This is likely the case if the
                // measured fg is much higher than the recipe anticipates.
                const a = sortedMeasurements[sortedMeasurements.length - 1];
                const b = sortedMeasurements[sortedMeasurements.length - 2];

                if (a.timestamp !== b.timestamp) {
                    if (a.gravity === b.gravity) {
                        isLikelyDone = true;
                        console.log('likely done!');
                    }
                }
            }

            return sortedMeasurements.map((measurement) => {
                return <tr>
                    <td>{ moment(measurement.timestamp).format('YYYY-MM-DD') }</td>
                    <td>{ parseFloat(measurement.specific_gravity).toPrecision(4) }</td>
                    <td>{ formatAbv(getAbvFromGravity(brewdayGravityMeasurement, measurement.specific_gravity)) }</td>
                </tr>
            });
        }

        const daysSpentFermenting = moment(moment.now()).diff(moment(beer.brewed), 'days');
        const expectedBottlingDate = moment(beer.brewed).add(recipe.fermentationSchedule.primary.time, 'days');
        let daysUntilBottling = expectedBottlingDate.diff(moment(moment.now()).startOf('day'), 'days');
        if (daysUntilBottling < 0) {
            daysUntilBottling = 0;
        }

        const fermSched = [
            {
                time: 14,
                temperature: [18, 20],
                type: "primary"
            },
            {
                time: 7,
                temperature: [2, 4],
                type: "secondary"
            },
            {
                time: 120,
                temperature: [0],
                type: "lagering"
            },
        ]

        function renderFermentationSchedule(_schedule) {
            function renderTemperatureRange(_temperatureRange) {
                if (_temperatureRange.length === 1) {
                    return _temperatureRange[0];
                }

                return (<span> { _temperatureRange[0] }–{ _temperatureRange[1] }</span>)
            }

            return (<table className="zebra knurk" cellSpacing="0" cellPadding="0">
                <thead><tr style={{
                            color: 'rgba(0, 0, 0, .54)'
                        }}>
                    <td>Type</td>
                    <td>Temperature</td>
                    <td>Time</td></tr>
                </thead>
                <tbody>
                    { _schedule.map((field) => {
                        return (<tr>
                        <td>{ field.type[0].toUpperCase() }{ field.type.substring(1) }</td>
                        <td>{ renderTemperatureRange(field.temperature) }°C</td>
                        <td>{ field.time } days</td>
                        </tr>)
                    })
                    }
                </tbody>
            </table>)
        }

        return (
            <div>

            { renderGravityMeasurementModal.call(this) }

            <brui-card-container>
                <brui-background-header><span>Status:</span> fermenting</brui-background-header>

                <brui-card>
                    <RecipeItem recipe={ recipe } />
                </brui-card>

                <brui-card>
                    <brui-card-header>Fermentation schedule</brui-card-header>

                    {/* <p>Brewed: { moment(this.props.beer.brewed).format('DD MMMM YYYY') }</p>
                    <p>Fermentation length: { recipe.fermentation.primary.length } days</p> */}

                    <p>Fermented for { daysSpentFermenting } days. { daysUntilBottling } days left.</p>
                    <p
                        style={{
                            fontSize: '12px',
                            color: 'rgba(0, 0, 0, .54)'
                        }}
                    >Packaging day is <span>{ expectedBottlingDate.format('DD MMMM') }</span> or later.</p>

                    { renderFermentationSchedule(fermSched) }

                    {/*<brui-button disabled>Set reminder</brui-button>*/}
                </brui-card>

                <brui-card>
                    <brui-card-header>Gravity measurements</brui-card-header>

                    <p
                        style={{
                            textAlign: 'right',
                            fontSize: '12px',
                            color: 'rgba(0, 0, 0, .54)'
                        }}
                    >Original gravity: { brewdayGravityMeasurement }</p>
                    <p
                        style={{
                            textAlign: 'right',
                            fontSize: '12px',
                            color: 'rgba(0, 0, 0, .54)'
                        }}
                    >Target final gravity: { recipe.fg.toPrecision(4) }</p>

                    <table className="zebra knurk" cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <td style={{ color: 'rgba(0, 0, 0, .54)' }}>Date</td>
                                <td style={{ color: 'rgba(0, 0, 0, .54)' }}>Measurement</td>
                                <td style={{ color: 'rgba(0, 0, 0, .54)' }}>ABV</td>
                            </tr>
                        </thead>
                        <tbody>
                            { renderFermentationMeasurements(this.props.beer.fermentation_gravity_measurements) }
                        </tbody>
                    </table>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <brui-button
                            onClick={ this.openGravityMeasurementModal.bind(this) }
                        >Record gravity</brui-button>
                    </div>
                </brui-card>

                <div style={{ opacity: '.3', pointerEvents: 'none' }}>
                <brui-card>
                    <brui-button>Add dry hop</brui-button>
                </brui-card>
                </div>

                <brui-card>
                    <brui-button
                        onClick={ this.onDone.bind(this) }
                    >Package beer</brui-button>
                </brui-card>

            </brui-card-container>
            </div>
        )
    }
}

BeerDetailFermenting.propTypes = {

}

export default BeerDetailFermenting;
