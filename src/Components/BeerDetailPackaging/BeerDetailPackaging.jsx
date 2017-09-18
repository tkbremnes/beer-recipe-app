import React from 'react';
import _ from 'underscore';

import primingSugarCalculator from '../../Utils/priming_sugar_calculator.js';

class BeerDetailPackaging extends React.Component {
    componentWillMount() {
        this.setState({
            volume: 22,
            volumesOfCo2: 2,
            temperature: 18
        });
    }

    render() {
        const volume = this.state.volume;
        const volumesOfCo2 = this.state.volumesOfCo2;
        const temperature = this.state.temperature;

        function increaseVolume() {
            this.setState({
                volume: volume + 1
            });
        }
        
        function decreaseVolume() {
            this.setState({
                volume: volume - 1
            });
        }
        
        function increaseCarbonation() {
            this.setState({
                volumesOfCo2: volumesOfCo2 + 0.1
            });
        }
        
        function decreaseCarbonation() {
            this.setState({
                volumesOfCo2: volumesOfCo2 - 0.1
            });
        }
        
        function increaseTemperature() {
            this.setState({
                temperature: temperature + 1
            });
        }
        
        function decreaseTemperature() {
            this.setState({
                temperature: temperature - 1
            });
        }

        function onDoneButtonPressed(_primingSugar) {
            const newBeer = _.clone(this.props.beer);

            newBeer.status = "packaged";
            newBeer.primingSugar = _primingSugar || 0;
            newBeer.volumesOfCo2 = this.state.volumesOfCo2;
            newBeer.packagedVolume = this.state.volume;
            newBeer.packaged = Date.now();
            newBeer.primingType = "sucrose";

            console.log(newBeer);
        }

        const primingSugar = Math.round(primingSugarCalculator.getPrimingSugar(volume, volumesOfCo2, temperature));
        
        return (
            <brui-card-container>
                <brui-card>
                    Date
                </brui-card>

                <brui-card>
                    <div>
                        <label><input type="radio" name="package_type" value="bottling" defaultChecked />Bottling</label>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}
                        ><input type="radio" name="package_type" value="kegging" disabled />Kegging</label>
                    </div>
                    <div>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}                        
                        ><input type="radio" name="carbonation_type" value="bottling" disabled />Priming sugar</label>
                        <label
                            style={{ color: 'rgba(0, 0, 0, .12)' }}
                        ><input type="radio" name="carbonation_type" value="kegging" disabled />Force carbonation</label>
                    </div>                        
                </brui-card>

                <brui-card>
                    <brui-card>
                        <brui-card-header>Packaged volume</brui-card-header>
                        <p>{ volume } L</p>
                        <brui-button onClick={ increaseVolume.bind(this) }>+</brui-button>
                        <brui-button onClick={ decreaseVolume.bind(this) }>-</brui-button>
                    </brui-card>
                    <brui-card>
                        <brui-card-header>Temperature</brui-card-header>
                        <p>{ temperature }°C</p>
                        <brui-button onClick={ increaseTemperature.bind(this) }>+</brui-button>
                        <brui-button onClick={ decreaseTemperature.bind(this) }>-</brui-button>
                    </brui-card>
                    <brui-card>
                        <brui-card-header>Volumes of CO²</brui-card-header>
                        <p>{ volumesOfCo2.toPrecision(2) }</p>
                        <brui-button onClick={ increaseCarbonation.bind(this) }>+</brui-button>
                        <brui-button onClick={ decreaseCarbonation.bind(this) }>-</brui-button>

                        <brui-card>
                            <p>British Style Ales	1.5 - 2.0 volumes</p>
                            <p>Belgian Ales	1.9 - 2.4 volumes</p>
                            <p>American Ales and Lager	2.2 - 2.7 volumes</p>
                            <p>Fruit Lambic	3.0 - 4.5 volumes</p>
                            <p>Porter, Stout	1.7 - 2.3 volumes</p>
                            <p>European Lagers	2.2 - 2.7 volumes</p>
                            <p>Lambic	2.4 - 2.8 volumes</p>
                            <p>German Wheat Beer	3.3 - 4.5 volumes</p>
                        </brui-card>
                    </brui-card>

                    <p>{ primingSugar } gram table sugar</p>

                    {/*<p>
                        [...] assumed that corn sugar is 91% sugar, while table sugar is 100% sugar. Dry Malt Extract (DME) is another option. This calculator uses 68% attenuation for DME. 
                    </p>*/}
                </brui-card>

                <brui-card>
                    <brui-button onClick={ onDoneButtonPressed.bind(this, primingSugar) }>Done</brui-button>
                </brui-card>
            </brui-card-container>
        )
    }
}

BeerDetailPackaging.propTypes = {

}

export default BeerDetailPackaging;
