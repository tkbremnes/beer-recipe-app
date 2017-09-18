import React from 'react';
import _ from 'underscore';
import moment from 'moment';

import RecipeItem from '../RecipeItem/RecipeItem.jsx';
import SpecificGravityInput from '../SpecificGravityInput/SpecificGravityInput.jsx';
import DateInput from '../DateInput/DateInput.jsx';

const Style = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .54)',
        zIndex: 99
    },
    inputReset: {
        display: 'none'
    }

}

class RecipeSelectorModal extends React.Component {
    componentWillMount() {
        const today = moment(moment.now()).format('YYYY-MM-DD');

        this.setState({
            gravityMeasurement: this.props.currentMeasurement,
            timestamp: today
        });
    }

    onSave() {
        const msSinceEpoch = moment(this.state.timestamp).valueOf();
        console.log(msSinceEpoch);
        const recordedGravity = {
            timestamp: msSinceEpoch,
            gravity: this.state.gravityMeasurement
        }
        this.props.onSave(recordedGravity);
    }

    onGravityChanged(newVal, oldVal) {
        this.setState({
            gravityMeasurement: newVal
        });
    }

    onDateChanged(newVal, oldVal) {
        console.log(newVal);
        this.setState({
            timestamp: newVal
        });
    }

    render() {
        const previousMeasurement = this.props.currentMeasurement;

        if (!this.state) {
            return (
                <div style={ Style.container }>
                    <brui-loader></brui-loader>
                </div>
            )
        }

        return (
            <div style={ Style.container }>
                <brui-panel>
                    <brui-card-header>Record gravity</brui-card-header>

                    <DateInput
                        onChange={ this.onDateChanged.bind(this) }
                        value={ this.state.timestamp }
                        label="Date"
                    ></DateInput>

                    <div style={{ display: 'flex'}}>
                        <div style={{ flexGrow: 1}}>
                            <SpecificGravityInput
                                onChange={ this.onGravityChanged.bind(this) }
                                value={ this.state.gravityMeasurement }
                                label="Gravity"
                            ></SpecificGravityInput>
                        </div>

                        <brui-button>-</brui-button>
                        <brui-button>+</brui-button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <brui-button secondary onClick={ this.props.onCancel }>Cancel</brui-button>
                        <brui-button onClick={ this.onSave.bind(this) }>Save</brui-button>
                    </div>
                </brui-panel>
            </div>
        )
    }
}

RecipeSelectorModal.propTypes = {

}

export default RecipeSelectorModal;
