import React, { Component } from 'react';

import Header from './Header';

import Fermentables from './Fermentables';
import Hops from './Hops';
import Yeasts from './Yeasts';

import BruiCard from "../BruiCard";
import BruiButton from "../BruiButton";

import GravityTargets from "./GravityTargets";
import FermentationSchedule from "./FermentationSchedule";
import BoilSchedule from "./BoilSchedule";
import MashSchedule from "./MashSchedule";
import RecipeSource from "./RecipeSource";

import Utils, { calculateAlcohol } from "../../Utils/Utils.js";
import calculateColor from "../../Utils/Calculators/calculateColor"
import calculateIbu from "../../Utils/Calculators/calculateIbu"
import calculateBoilSize from "../../Utils/Calculators/calculateBoilSize"

import "./styles.css";

const BrewerySettings = {
    batchSize: 19,
    evaporationRate: 4,
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

        const totalGrainWeight = Utils.getAmountOfMaltFromFermentables(
            fermentables,
            meta.original_gravity,
            BrewerySettings.batchSize,
            BrewerySettings.brewhouseEfficiency
        );

        const color = calculateColor(
            fermentables.map((fermentableAddition) => {
                return {
                    weight: fermentableAddition.amount * totalGrainWeight,
                    color: fermentableAddition.fermentable.color
                };
            }), BrewerySettings.batchSize
        );

        const boilSize = calculateBoilSize(
            BrewerySettings.batchSize,
            meta.boil_time,
            BrewerySettings.evaporationRate
        );

        const ibu = calculateIbu(
            hops.map((hopAddition) => {
                return {
                    alpha_acids: hopAddition.hop.alpha_acids,
                    time: hopAddition.time,
                    weight: hopAddition.amount * BrewerySettings.batchSize,
                }
            }),
            boilSize,
            BrewerySettings.batchSize,
            meta.original_gravity,
        );

        return (
            <div className="RecipeDetail">
                <Header
                    name={meta.name}
                    beerStyle={meta.style.name}
                    abv={calculateAlcohol(meta.original_gravity, meta.final_gravity).abv}
                    ibu={ibu}
                    color={color}
                />

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
                    totalGrainWeight={totalGrainWeight}
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
