import React from 'react';
import uuid from "uuid";

import TemperatureInput from '../../BruiTemperatureInput';
import TimeInput from '../../BruiTimeInput';
import BruiCard from '../../BruiCard';
import BruiButton from '../../BruiButton';

class MashSchedule extends React.Component {
    componentWillMount() {
        this.setState({
            schedule: this.props.schedule.map((step) => {
                if (!step.id) {
                    step.id = uuid.v4();
                }
                return step;
            })
        })
    }

    handleChange(type, value) {
        const updatedSchedule = this.state.schedule;
        updatedSchedule[0] = {
            time: type === "time" ? value : this.state.schedule[0].time,
            temperature: type === "temperature" ? value : this.state.schedule[0].temperature
        }
        this.props.onChange(updatedSchedule);
    }

    render() {
        const schedule = this.state.schedule;

        return (
            <BruiCard
                header="Mashing"
            >
                { schedule.map((_step) => {
                    return (
                        <BruiCard key={ _step.id }>
                            <TemperatureInput
                                label="Temperature"
                                value={ _step.temperature }
                                onChange={ this.handleChange.bind(this, 'temperature') }
                            />

                            <TimeInput
                                label="Time"
                                value={ _step.time }
                                onChange={ this.handleChange.bind(this, 'time') }
                            />
                        </BruiCard>
                    )
                }) }

                <div>
                    <BruiButton disabled>Add note</BruiButton>
                    <BruiButton disabled>Add mash step</BruiButton>
                </div>
            </BruiCard>
        )
    }
}

export default MashSchedule;
