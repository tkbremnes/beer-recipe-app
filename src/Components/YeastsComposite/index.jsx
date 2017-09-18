import React from 'react';

import Yeasts from '../Yeasts/index.jsx';
import BruiCard from "../BruiCard";

class YeastsComposite extends React.Component {
    render() {
        function collectionToArray(collection) {
            return Object.keys(collection).map((key) => {
                return collection[key]
            });
        }
        const yeasts = collectionToArray(this.props.yeasts);
        const title = yeasts.length === 1 ? 'Yeast' : 'Yeasts';

        return (
            <BruiCard header={ title }>
                <Yeasts
                    yeasts={ yeasts }
                />
            </BruiCard>
        )
    }
}

YeastsComposite.propTypes = {
    // yeasts: React.PropTypes.array.isRequired
}

export default YeastsComposite;
