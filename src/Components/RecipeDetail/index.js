import React, { Component } from 'react';

import Fermentables from './Fermentables';
import Hops from './Hops';
import Yeasts from './Yeasts';
import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';

import BruiCard from "../BruiCard";
import BruiButton from "../BruiButton";

import GravityTargets from "./GravityTargets";
import FermentationSchedule from "./FermentationSchedule";
import BoilSchedule from "./BoilSchedule";
import MashSchedule from "./MashSchedule";
import RecipeSource from "./RecipeSource";

import "./styles.css";

const BrewerySettings = {
    batchSize: 19,
    brewhouseEfficiency: 0.75,
};

class Recipe extends Component {
    render() {
        const {
            fermentables,
            hops,
            yeasts,
            meta,
            mash_schedule,
            fermentation_schedule,
        } = this.props.recipe;

        return (
            <div className="RecipeDetail">
                <BruiCard>
                    <p className="readable-text">This recipe is meant for { BrewerySettings.batchSize } liters of beer. Assuming { BrewerySettings.brewhouseEfficiency * 100 }% efficiency.</p>

                    { meta.comment &&
                        <p className="readable-text quote"> {meta.comment }</p>
                    }

                    <GravityTargets
                        preboilGravity={meta.preboil_gravity}
                        originalGravity={meta.original_gravity}
                        finalGravity={meta.final_gravity}
                    />

                    <RecipeSource
                        source={meta.source}
                    />
                </BruiCard>

                <Fermentables
                    fermentables={fermentables}
                />

                <Hops
                    hops={ hops }
                    batchSize={ BrewerySettings.batchSize }
                />

                <Yeasts
                    yeasts={ yeasts }
                />

                <MashSchedule
                    schedule={mash_schedule}
                />

                <FermentationSchedule
                    schedule={fermentation_schedule}
                />

                <BoilSchedule
                    boilTime={meta.boil_time}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <div>
                        <BruiButton
                            onClick={() => {}}
                        >Edit</BruiButton>
                    </div>

                    <div>
                        <BruiButton onClick={ this.props.onDelete }>Delete</BruiButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;
