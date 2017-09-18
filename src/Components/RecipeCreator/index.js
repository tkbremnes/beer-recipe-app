import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./style.css";

import Utils from "../../Utils/Utils";
import recipeValidator from '../../Utils/recipeValidator';

import BruiWizard from "../BruiWizard";
import Step from "../BruiWizard/Step";

import {
    saveRecipe,
    fetchRecipe,
    setAppHeaderText
} from '../../Actions';

import BruiCard from '../BruiCard';

import Loader from '../Loader/index.jsx';

import FermentablesInput from "./FermentablesInput";
import HopsInput from "./HopsInput";
import YeastsInput from "./YeastsInput";
import MashSchedule from "./MashSchedule";
import FermentationSchedule from "./FermentationSchedule";
import BruiTimeInput from '../BruiTimeInput';
import Description from "./Description";
import GravityInput from "./GravityInput";
import MetaInput from "./MetaInput";
import BruiVolumeInput from '../BruiVolumeInput';
import Button from '../BruiButton';

import Sidebar from "./Sidebar"

const emptyRecipe = {
    fermentables: [],
    hops: [],
    yeasts: [],
    fermentation_schedule: [{time: '', temperature: ''}],
    mash_schedule: [{time: 60, temperature: 67}],
    boil_time: 60,
    boil_volume: "",
    meta: {},
    preboil_gravity: 1.000,
    original_gravity: 1.000,
    final_gravity: 1.000,
}

class RecipeCreator extends Component {
    metaChanged(type, value) {
      if (value.target) {
        return this.setState({
          [type]: value.target.value
        })
      }
      this.setState({[type]: value});
    }

    componentWillMount() {
        if (this.props.match.params.recipeId) {
            console.log(`Editing: ${this.props.match.params.recipeId}`);
            return this.props.dispatch(fetchRecipe(this.props.match.params.recipeId));
        }

        const recipe = emptyRecipe;
        const calculatedMeta = Utils.calculateRecipeMeta(recipe);
        recipe._meta = calculatedMeta;

        this.props.dispatch(setAppHeaderText("New recipe"))
        this.setState(recipe);
    }

    _saveRecipe(isDebug) {
        let formattedRecipe;
        try {
            formattedRecipe = recipeValidator.normalize(this.state);
        }
        catch (e) {
            console.error(e.message);
            return;
        }

        if (isDebug) {
            console.log(formattedRecipe);
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
            name: meta.name,
            source: meta.source,
            batch_volume: meta.batch_volume,
            style: meta.style,
        });
    }

    _handleDescriptionChange(description) {
        this.setState({
            description,
        });
    }

    render() {
        if ((this.props.recipe && Object.keys(this.props.recipe).length === 0) && !this.state) {
            return <Loader></Loader>
        }
        const recipe = (Object.keys(this.props.recipe).length !== 0 && this.props.recipe) || this.state;

        console.log(recipe);

        const recipeValidity = recipeValidator.checkRecipe(recipe);
        const calculatedMeta = Utils.calculateRecipeMeta(recipe);
        const alcohol = Utils.calculateAlcoholFromRecipeMeta({
            original_gravity: recipe.original_gravity,
            preboil_gravity: recipe.preboil_gravity,
            final_gravity: recipe.final_gravity,
        });

        return (
            <div className="RecipeCreator">
                <BruiWizard>
                    <Step>
                        <FermentablesInput
                            fermentables={recipe.fermentables}
                            onChange={this.fermentablesChanged.bind(this)}
                        ></FermentablesInput>
                    </Step>

                    <Step>
                        <MetaInput
                            onChange={ this._handleMetaChange.bind(this) }
                        />
                        <Description
                            description={ recipe.description && recipe.description.body }
                            onChange={ this._handleDescriptionChange.bind(this) }
                        ></Description>

                        <GravityInput
                            og={ alcohol.original_gravity }
                            fg={ alcohol.final_gravity }
                            bg={ alcohol.preboil_gravity }
                            onChange={ this.gravityChanged.bind(this) }
                        ></GravityInput>

                    </Step>

                    <Step>
                        <HopsInput
                            hops={recipe.hops}
                            onChange={this.hopsChanged}
                        ></HopsInput>
                    </Step>

                    <Step>
                        <YeastsInput
                            yeasts={ recipe.yeasts }
                            onChange={ this.yeastsChanged.bind(this) }
                        >
                        </YeastsInput>
                    </Step>

                    {/* <Step>
                        <MashSchedule
                            schedule={ recipe.mash_schedule }
                            onChange={ this.mashScheduleChanged.bind(this) }
                        ></MashSchedule>
                    </Step> */}

                    {/* <Step>
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
                    </Step> */}

                    {/* <Step>
                        <FermentationSchedule
                            schedule={ recipe.fermentation_schedule }
                            onChange={ this.fermentationScheduleChanged.bind(this) }
                        ></FermentationSchedule>
                    </Step> */}

                    <Step>
                        <BruiCard>
                            <p>{ recipe.name || '' }</p>
                            <p>{ recipe.style || '' }</p>
                            <p>ibu={ calculatedMeta.bitterness.ibu || 0 }</p>
                            <p>abv={ calculatedMeta.alcohol.abv || 0 }</p>
                            <p>ebc={ calculatedMeta.color.ebc || 0 }</p>

                            <p>Does this look OK to you?</p>

                            {
                                recipeValidator.isValid(recipe) ?
                                <Button onClick={ this._saveRecipe.bind(this) }>Save</Button> :
                                <Button disabled>Missing fields</Button>
                            }

                            <Button>Save draft</Button>

                            <Button onClick={ this._saveRecipe.bind(this, true) }>Debug</Button>
                            {/* <Button onClick={ this._saveRecipe.bind(this) }>Force Save</Button> */}

                        </BruiCard>
                    </Step>
                </BruiWizard>

                <Sidebar
                    alcohol={{ abv: alcohol.abv, abw: alcohol.abw }}
                    color={{ ebc: calculatedMeta.color.ebc, srm: calculatedMeta.color.srm }}
                    bitterness={{ ibu: calculatedMeta.bitterness.ibu, ebu: calculatedMeta.bitterness.ebu }}
                    name={ recipe.name }
                    beerStyle={ recipe.style }

                    styleGuidelines={{
                        abv: [0.04, 0.07],
                        ebc: [2, 10],
                        srm: [2, 10],
                        ibu: [50, 80]
                    }}

                    recipeValidity={ recipeValidity }
                />
            </div>
        )
    }
}

function select(state) {
    return {
        recipe: state.recipe
    }
}

export default connect(select)(RecipeCreator);
