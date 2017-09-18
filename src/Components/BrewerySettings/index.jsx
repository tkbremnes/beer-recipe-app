import React from 'react';

import { connect } from 'react-redux';
import { fetchBrewerySettings } from '../../Utils/Actions';

import Loader from '../Loader/index.jsx';

class BrewerySettings extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchBrewerySettings());
    }

    render() {
        console.log(this.props.brewerySettings);
        if(!(this.props.brewerySettings && this.props.brewerySettings.meta)) {
            return (<Loader></Loader>);
        }

        const settings = this.props.brewerySettings;
        
        const id = this.props.brewerySettings.meta.id;
        const name = this.props.brewerySettings.meta.name;

        return (
            <brui-panel>
                <brui-card-header>Settings</brui-card-header>

                <brui-card>
                    <brui-card-header>Brewhouse</brui-card-header>
                    <p>{ id }</p>
                    <p>{ name }</p>
                </brui-card>

                <brui-card>
                    <div>
                        <label><input type="radio" name="locale" value="metric" defaultChecked />Metric</label>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}
                        ><input type="radio" name="locale" value="imperial" disabled />Imperial</label>
                    </div>

                    <div>
                        <label><input type="radio" name="temperature" value="celcius" defaultChecked />Celcius</label>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}
                        ><input type="radio" name="temperature" value="fahrenheit" disabled />Fahrenheit</label>
                    </div>

                    <div>
                        <label><input type="radio" name="color" value="ebc" defaultChecked />EBC</label>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}
                        ><input type="radio" name="color" value= "srm" disabled />SRM/°L</label>
                    </div>
                </brui-card>

                <brui-card>
                    <brui-card-header>Equipment profile</brui-card-header>

                    <brui-volume-input
                        label="Default batch size"
                        value={ settings.default_batch_size }
                    ></brui-volume-input>

                    <brui-percent-input
                        label="Brewhouse efficiency"
                        value={ settings.brewhouse_efficiency }
                    ></brui-percent-input>

                    <brui-button>Advanced</brui-button>

                    {/* <advanced-input>
                        <brui-labeled-number-input
                            label="Brewhouse efficiency"
                        ></brui-labeled-number-input>

                        <brui-button>Primary</brui-button>
                        <brui-button secondary>Secondary</brui-button>
                    </advanced-input> */}
                </brui-card>
            </brui-panel>
        )
    }
}

BrewerySettings.propTypes = {

}

function select(state) {
    // window.state = state;
    return {
        brewerySettings: state.brewerySettings
    }
}

export default connect(select)(BrewerySettings);
