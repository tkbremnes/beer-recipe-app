import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import {
    fetchBeer,
    fetchFermentationGravityMeasurements
} from '../../Utils/Actions';

import BeerDetailBrewing from '../BeerDetailBrewing/BeerDetailBrewing.jsx';
import BeerDetailFermenting from '../BeerDetailFermenting/BeerDetailFermenting.jsx';
import BeerDetailTapped from '../BeerDetailTapped/BeerDetailTapped.jsx';
import BeerDetailPackaging from '../BeerDetailPackaging/BeerDetailPackaging.jsx';

class BeerDetail extends React.Component {
    componentWillMount() {
        // get the recipe from the provided id
        // this.props.dispatch(fetchFermentationGravityMeasurements(this.props.params.beerId))
        this.props.dispatch(fetchBeer(this.props.params.beerId))
    }

    setState(state, beerId) {
        if (['brewing', 'fermenting', 'tapped'].indexOf(state) === -1) {
            return;
        }

        this.props.dispatch({type: 'set_state', state, id: beerId});
    }

    setBeerStatus(beerId, status) {
        console.log('got it!, setting to ' + status);
        console.log(status, beerId);
    }

    render() {
        if (!this.props.beer) {
            return <brui-loader-card>Loading beer. Please wait...</brui-loader-card>
        }
        const beer = this.props.beer;
        const gravityMeasurements = this.props.fermentationGravityMeasurements;

        function renderBasedOnStatus(beer) {
            switch (beer.status) {
                case 'brewing': {
                    return <BeerDetailBrewing
                        beer={ beer }
                        onDone={ this.setBeerStatus.bind(this, beer.id, 'fermenting') }
                    />
                }
                case 'fermenting': {
                    return <BeerDetailFermenting
                        gravityMeasurements={ gravityMeasurements }
                        beer={ beer }
                        onDone={ this.setBeerStatus.bind(this, beer.id, 'tapped') }
                    />
                }
                case 'packaging': {
                    return <BeerDetailPackaging
                        beer={ beer }
                    />
                }
                case 'packaged':
                case 'finished':
                case 'tapped': {
                    return <BeerDetailTapped
                        beer={ beer }
                    />
                }
            }
        }

        return (
            <div>{ renderBasedOnStatus.call(this, beer) }</div>
        )
    }
}

BeerDetail.propTypes = {

}

function select(state) {
    return {
        beer: state.beer,
        fermentationGravityMeasurements: state.gravityMeasurement
    }
}

export default connect(select)(BeerDetail);
