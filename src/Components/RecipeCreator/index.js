import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    formatSpecificGravity,
    formatPercent,
} from "Utils/Format";

import Utils from "Utils/Utils";
import CalculateBitterness from "Utils/Calculators/calculateIbu";
import CalculateBoilSize from "Utils/Calculators/calculateBoilSize";
import CalculatePreboilGravity from "Utils/Calculators/calculatePreboilGravity";
import {
    calculateAbv,
} from "Utils/abv_calculator";

import recipeValidator from 'Utils/recipeValidator';

import {
    saveRecipe,
    fetchRecipe,
} from 'Actions';

import Recipe from "Model/Recipe"

import {
    fetchIngredients,
} from "Redux/Ingredients/Actions";

import BruiWizard from "Components/BruiWizard";
import Step from "Components/BruiWizard/Step";
import BruiCard from 'Components/BruiCard';
import BruiVolumeInput from 'Components/BruiVolumeInput';
import Button from 'Components/BruiButton';
import BruiTimeInput from 'Components/BruiTimeInput';

import FermentablesInput from "./FermentablesInput";
import HopsInput from "./HopsInput";
import YeastsInput from "./YeastsInput";
import MashSchedule from "./MashSchedule";
import FermentationSchedule from "./FermentationSchedule";
import Description from "./Description";
import GravityInput from "./GravityInput";
import MetaInput from "./MetaInput";
import Sidebar from "./Sidebar"

import "./style.css";

class RecipeCreator extends Component {
    state = {
        recipe: new Recipe(),
    }

    metaChanged(type, value) {
      if (value.target) {
        return this.setState({
          [type]: value.target.value
        })
      }
      this.setState({[type]: value});
    }

    componentWillMount() {
        this.props.dispatch(fetchIngredients());

        if (this.props.match.params.recipeId) {
            return this.props.dispatch(fetchRecipe(this.props.match.params.recipeId));
        }

        if (this.props.recipe.name) {
            this.setState({
                recipe: this.props.recipe,
            });
        }
    }

    componentWillReceiveProps(newProps, oldProps) {
        // if (newProps.recipe !== oldProps.recipe) {
        //     this.setState({
        //         recipe: newProps.recipe,
        //     });
        // }
    }

    _saveRecipe() {
        let formattedRecipe;
        try {
            formattedRecipe = recipeValidator.normalize(this.state);
        }
        catch (e) {
            return;
        }

        this.props.dispatch(saveRecipe(formattedRecipe))
            .then((recipe) => {
                return this.props.history.push(`/recipes/${ recipe.id }`);
            });
    }

    fermentablesChanged(fermentables) {
        this.setState({fermentables});
    }

    hopsChanged = (hops) => {
      this.setState({hops});
    }

    yeastsChanged(yeasts) {
      this.setState({yeasts});
    }

    fermentationScheduleChanged(fermentation_schedule) {
      this.setState({fermentation_schedule});
    }

    mashScheduleChanged(mash_schedule) {
      this.setState({mash_schedule});
    }

    gravityChanged(updatedGravity) {
      this.setState({
          original_gravity: updatedGravity.original,
          preboil_gravity: updatedGravity.preboil,
          final_gravity: updatedGravity.final,
      });
    }

    _handleMetaChange(meta) {
        this.setState({
            meta,
        });
    }

    _handleDescriptionChange(description) {
        this.setState({
            description,
        });
    }

    render() {
        const recipe = this.state.recipe;

        const {
            fermentables,
            hops,
            yeasts,
            // meta,
        } = this.state.recipe;

        const recipeValidity = recipeValidator.checkRecipe(recipe);
        const calculatedMeta = Utils.calculateRecipeMeta(recipe);
        const alcohol = Utils.calculateAlcoholFromRecipeMeta({
            original_gravity: recipe.original_gravity,
            preboil_gravity: recipe.preboil_gravity,
            final_gravity: recipe.final_gravity,
        });

        const preboilVolume = recipe.batch_volume ? CalculateBoilSize(recipe.batch_volume, recipe.boil_time, 4) : 0;
        const bitterness = recipe.batch_volume ? CalculateBitterness(
            recipe.hops.map(({ hop, time, weight }) => {
                return {
                    weight,
                    time,
                    alpha_acids: hop.alpha_acids,
                };
            }),
            preboilVolume,
            recipe.batch_volume,
            recipe.original_gravity,
        ) : 0;

        const calculatedPreboilGravity = CalculatePreboilGravity(
            preboilVolume,
            recipe.batch_volume,
            recipe.original_gravity
        ) || 1;

        return (
            <div className="RecipeCreator">
                <BruiWizard>
                    <Step>
                        <MetaInput
                            onChange={ this._handleMetaChange.bind(this) }
                        />
                        <Description
                            description={ recipe.description && recipe.description.body }
                            onChange={ this._handleDescriptionChange.bind(this) }
                        ></Description>


                        <BruiCard
                            header="Gravity targets"
                        >
                            <GravityInput
                                og={ this.state.original_gravity }
                                fg={ this.state.final_gravity }
                                onChange={ this.gravityChanged.bind(this) }
                            ></GravityInput>

                            <p>Preboil gravity: { formatSpecificGravity(calculatedPreboilGravity) }</p>
                            <p>Expected ABV: { formatPercent(calculateAbv(this.state.original_gravity, this.state.final_gravity)) }</p>
                        </BruiCard>
                    </Step>

                    <Step>
                        <FermentablesInput
                            fermentables={fermentables.map((fermentable) => {
                                // TODO: format this back to the thing it came from
                                return fermentable;
                            })}
                            fermentableIngredients={this.props.ingredients.fermentables}
                            onChange={this.fermentablesChanged.bind(this)}
                        ></FermentablesInput>
                    </Step>

                    <Step>
                        <HopsInput
                            hops={hops.map((hop) => {
                                // TODO: format this back to the thing it came from
                                return hop;
                            })}
                            onChange={this.hopsChanged}
                            hopsIngredients={this.props.ingredients.hops}
                        ></HopsInput>
                    </Step>

                    <Step>
                        <YeastsInput
                            yeasts={ yeasts }
                            onChange={ this.yeastsChanged.bind(this) }
                        >
                        </YeastsInput>
                    </Step>

                    <Step>
                        <MashSchedule
                            schedule={ recipe.mash_schedule }
                            onChange={ this.mashScheduleChanged.bind(this) }
                        ></MashSchedule>
                    </Step>

                    <Step>
                        <BruiCard
                            header="Boiling"
                        >
                            <BruiVolumeInput
                                label="Boil volume"
                                value={ recipe.boil_volume }
                                onChange={ this.metaChanged.bind(this, 'boil_volume') }
                            />

                            <BruiTimeInput
                                label="Boil time"
                                value={ recipe.boil_time }
                                onChange={ this.metaChanged.bind(this, 'boil_time') }
                            />
                        </BruiCard>
                    </Step>

                    <Step>
                        <FermentationSchedule
                            schedule={ recipe.fermentation_schedule }
                            onChange={ this.fermentationScheduleChanged.bind(this) }
                        ></FermentationSchedule>
                    </Step>

                    <Step>
                        <BruiCard>
                            <p>{ recipe.name || '' }</p>
                            <p>ibu={ calculatedMeta.bitterness.ibu || 0 }</p>
                            <p>abv={ calculatedMeta.alcohol.abv || 0 }</p>
                            <p>ebc={ calculatedMeta.color.ebc || 0 }</p>

                            <p>Does this look OK to you?</p>

                            {
                                recipeValidator.isValid(recipe) ?
                                <Button onClick={ this._saveRecipe.bind(this) }>Save</Button> :
                                <Button onClick={() => {}} disabled>Missing fields</Button>
                            }

                            <Button onClick={() => {}}>Save draft</Button>

                            <Button onClick={ this._saveRecipe.bind(this, true) }>Debug</Button>
                            {/* <Button onClick={ this._saveRecipe.bind(this) }>Force Save</Button> */}

                        </BruiCard>
                    </Step>
                </BruiWizard>

                <Sidebar
                    alcohol={alcohol.abv}
                    color={ calculatedMeta.color.srm }
                    bitterness={bitterness}
                    name={ recipe.name }
                    beerStyle={ recipe.style }

                    recipeValidity={ recipeValidity }

                    recipe={recipe}
                />
            </div>
        )
    }
}

function select(state) {
    return {
        recipe: state.recipe,
        ingredients: state.ingredients,
    }
}

export default connect(select)(RecipeCreator);
