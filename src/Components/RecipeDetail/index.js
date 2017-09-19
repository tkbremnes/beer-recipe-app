import React, { Component } from 'react';

import FermentablesComposite from '../FermentablesComposite/index.jsx';
import HopsComposite from '../Hops';
import YeastsComposite from '../YeastsComposite/index.jsx';
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
};

class Recipe extends Component {
    render() {
        const recipe = this.props.recipe;

        const fermentables = recipe.fermentables;
        const hops = recipe.hops;
        const yeasts = recipe.yeasts;

        return (
            <div className="RecipeDetail">
                <BruiCard>
                    <p className="readable-text">This recipe makes { BrewerySettings.batchSize } liters of beer.</p>

                    { recipe.meta.comment &&
                        <p className="readable-text quote"> {recipe.meta.comment }</p>
                    }

                    <GravityTargets
                        preboilGravity={recipe.meta.preboil_gravity}
                        originalGravity={recipe.meta.original_gravity}
                        finalGravity={recipe.meta.final_gravity}
                    />

                    <RecipeSource
                        source={recipe.meta.source}
                    />
                </BruiCard>

                <FermentablesComposite
                    fermentables={ fermentables }
                />

                <HopsComposite
                    hops={ hops }
                    batchSize={ BrewerySettings.batchSize }
                />

                <YeastsComposite
                    yeasts={ yeasts }
                />

                <MashSchedule
                    schedule={recipe.mash_schedule}
                />

                <FermentationSchedule
                    schedule={recipe.fermentation_schedule}
                />

                <BoilSchedule
                    boilTime={recipe.meta.boil_time}
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
