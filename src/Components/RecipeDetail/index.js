import React, { Component } from 'react';

import Header from './Header';

import Fermentables from './Fermentables';
import Hops from './Hops';
import Yeasts from './Yeasts';

import Card from "../BruiCard";
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
    batchSize: 21,
    evaporationRate: 4,
    brewhouseEfficiency: 0.73,
};

class Recipe extends Component {
    state = {
        batchSize: BrewerySettings.batchSize,
        brewhouseEfficiency: BrewerySettings.brewhouseEfficiency,
    }

    increaseBatchSize = () => {
        this.setState({
            batchSize: this.state.batchSize + 1,
        });
    }
    decreaseBatchSize = () => {
        this.setState({
            batchSize: this.state.batchSize - 1,
        });
    }

    increaseBrewhouseEfficiency = () => {
        this.setState({
            brewhouseEfficiency: this.state.brewhouseEfficiency + 0.01,
        });
    }
    decreaseBrewhouseEfficiency = () => {
        this.setState({
            brewhouseEfficiency: this.state.brewhouseEfficiency - 0.01,
        });
    }
    editRecipe = () => {
        const recipeId = this.props.recipe.id;
        window.location.pathname = `recipes/${ recipeId }/edit`;
    }

    render() {
        const {
            fermentables,
            hops,
            yeasts,
            meta,
            mash_schedule,
            fermentation_schedule,
        } = this.props.recipe;

        const {
            batchSize,
            brewhouseEfficiency,
        } = this.state;

        const totalGrainWeight = Utils.getAmountOfMaltFromFermentables(
            fermentables,
            meta.original_gravity,
            batchSize,
            brewhouseEfficiency
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

                <Card>
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
                </Card>

                <Card header="Brewery settings">
                    <Card>
                        <p className="readable-text">
                            Batch size: {batchSize} liters
                        </p>

                        <BruiButton onClick={this.increaseBatchSize}>
                            +
                        </BruiButton>
                        <BruiButton onClick={this.decreaseBatchSize}>
                            -
                        </BruiButton>
                    </Card>

                    <Card>
                        <p className="readable-text">
                            Efficiency: {Math.floor(brewhouseEfficiency * 100)}%
                        </p>

                        <BruiButton onClick={this.increaseBrewhouseEfficiency}>
                            +
                        </BruiButton>
                        <BruiButton onClick={this.decreaseBrewhouseEfficiency}>
                            -
                        </BruiButton>
                    </Card>
                </Card>

                <Fermentables
                    fermentables={fermentables}
                    totalGrainWeight={totalGrainWeight}
                />

                <Hops
                    hops={ hops }
                    batchSize={ batchSize }
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <div>
                        <BruiButton
                            onClick={this.editRecipe}
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
