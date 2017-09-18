import React from 'react';
import PropTypes from 'prop-types';
import uuid from "uuid";

import BruiTemperatureInput from '../../BruiTemperatureInput';
import BruiTimeInput from '../../BruiTimeInput';
import BruiCard from '../../BruiCard';
import BruiButton from '../../BruiButton';

class FermentationSchedule extends React.Component {
    componentWillMount() {
        const schedule = this.props.schedule.map((step) => {
            step.id = step.id || uuid.v4();
            return step;
        });

        this.setState({
            schedule,
        });
    }

    _handleAddFermentationStep() {
        const schedule = this.state.schedule.slice(0);

        schedule.push({
            id: uuid.v4(),
            time: "",
            temperature: "",
        });

        this.setState({
            schedule
        })
    }

    _handleChange(id, type, value) {
        const schedule = this.state.schedule.slice(0);

        const changed = schedule.find((_step) => {
            return _step.id === id;
        })
        changed[type] = value;

        this.setState({
            schedule
        });

        const externalRepresentation = schedule.filter((_step) => {
            return _step.time && _step.temperature;
        });

        this.props.onChange(externalRepresentation);
    }

    render() {
        const schedule = this.state.schedule;

        console.log(schedule)

        return (
            <BruiCard
                header="Fermentation"
            >

                { schedule.map((_step) => {
                    return (
                        <BruiCard key={ _step.id }>
                            <BruiTemperatureInput
                                label="Temperature"
                                value={ _step.temperature }
                                onChange={ this._handleChange.bind(this, _step.id, 'temperature') }
                            />

                            <BruiTimeInput
                                label="Time"
                                type="days"
                                value={ parseInt(_step.time, 10) }
                                onChange={ this._handleChange.bind(this, _step.id, 'time') }
                            />
                        </BruiCard>
                    )
                })}

                <div>
                    <BruiButton
                        onClick={ this._handleAddFermentationStep.bind(this) }
                    >Add fermentation step</BruiButton>
                </div>
            </BruiCard>
        )
    }
}

FermentationSchedule.propTypes = {
    onChange: PropTypes.func.isRequired,
    schedule: PropTypes.array,
}

export default FermentationSchedule;
