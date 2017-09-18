import React from 'react';

import Fermentables from '../Fermentables/index.jsx';
import BruiCard from "../BruiCard";

class FermentablesComposite extends React.Component {
    render() {
        function collectionToArray(collection) {
            return Object.keys(collection).map((key) => {
                return collection[key]
            });
        }
        const fermentables = collectionToArray(this.props.fermentables);

        return (
            <BruiCard header="Fermentables">
                <Fermentables
                    fermentables={ fermentables }
                />

            </BruiCard>
        )
    }
}

export default FermentablesComposite;
