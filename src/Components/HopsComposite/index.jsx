import React from 'react';

import Hops from '../Hops/index.jsx';
import BruiCard from "../BruiCard";

class HopsComposite extends React.Component {
    render() {
        function collectionToArray(collection) {
            return Object.keys(collection).map((key) => {
                return collection[key]
            });
        }
        const hops = collectionToArray(this.props.hops);

        return (
            <BruiCard header="Hops">
                <Hops
                    hops={ hops }
                />
            </BruiCard>
        )
    }
}

HopsComposite.propTypes = {
    // hops: React.PropTypes.array.isRequired
}

export default HopsComposite;
