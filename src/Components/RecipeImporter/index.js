import React, { Component } from 'react';
import { connect } from 'react-redux';
import hash from "object-hash";

import "./style.css";

import Page from '../Page';
import ImportableRecipe from '../ImportableRecipe';
import BruiCard from '../BruiCard';
import BruiButton from '../BruiButton';
import BruiImportFileButton from '../BruiImportFileButton';
import BruiUrlInput from '../BruiUrlInput';
import RecipeCard from '../RecipeCard';

import Utils from '../../Utils/Utils';

import {
    importRecipe,
    setAppHeaderText
} from '../../Actions';

import {
    parseQueryString
} from '../../Utils/Url.js';

class RecipeImporter extends Component {
    componentWillMount() {
        const qs = parseQueryString();
        this.props.dispatch(setAppHeaderText("Import recipe"));

        if (!qs.url) {
            return;
        }

        this._fetchRecipeUrl(qs.url);
    }

    _fetchRecipeUrl(url) {
        return window.fetch(url)
            .then(res => res.json())
            .then((recipe) => {
                this.setState({
                    importedRecipe: recipe
                });
            });
    }

    _handleFileSubmitted(file) {
        const fileHash = hash.MD5(file);
        console.log(fileHash)
        // TODO: use this to check for duplicates

        this.setState({
            importedRecipe: file
        });
    }

    _addToRecipes(recipe) {
        this.props.dispatch(importRecipe({ recipe })).then((recipe) => {
            return this.props.history.push(`/recipes/${ recipe.id }`);
        });
    }

    _handleUrlInputChange(url) {
        this.setState({
            url
        });
    }

    _handleUrlSubmit(event) {
        event.preventDefault();

        this._fetchRecipeUrl(this.state.url);
    }

    render() {
        if (this.state && this.state.importedRecipe) {
            const recipe = this.state.importedRecipe;

            const calculatedMeta = Utils.calculateRecipeMeta(recipe);

            let abv = '?';
            let ibu = '?';
            let ebc = '?';
            if (calculatedMeta && calculatedMeta.alcohol) {
                abv = calculatedMeta.alcohol.abv;
            }

            if (calculatedMeta && calculatedMeta.bitterness) {
                ibu = Math.round(calculatedMeta.bitterness.ibu || 0);
            }

            if (calculatedMeta && calculatedMeta.color) {
                ebc = Math.round(calculatedMeta.color.ebc || 0);
            }

            const style = recipe.meta.style;

            return (
                <Page>
                    <BruiCard header="Import this recipe?">

                        <RecipeCard
                            name={ recipe.meta.name }
                            style={ style }
                            abv={ abv }
                            ebc={ ebc }
                            ibu={ ibu }
                        />

                        <BruiButton
                            onClick={ this._addToRecipes.bind(this, this.state.importedRecipe) }
                        >
                            Add to recipes
                        </BruiButton>

                    </BruiCard>
                </Page>
            )
        }

        return (
            <Page>
                <BruiCard header="Import recipe from file">
                    <BruiImportFileButton
                        onFileSubmitted={ this._handleFileSubmitted.bind(this) }
                    />
                </BruiCard>

                <BruiCard header="Import recipe from url">
                    <form onSubmit={ this._handleUrlSubmit.bind(this) }>
                        <BruiUrlInput onChange={ this._handleUrlInputChange.bind(this) } />
                        <BruiButton>Fetch</BruiButton>
                    </form>
                </BruiCard>

                <BruiCard header="Example recipes">
                    <ImportableRecipe
                        name="Gold Bear Kölsch"
                        beerStyle="Kölsch"
                        abv={0.053}
                        ibu={ 67 }
                        ebc={ 3 }
                        url="https://s3-eu-west-1.amazonaws.com/beer-recipe-db/reference.recipe.json"
                    />

                    <ImportableRecipe
                        name="Gold Bear Kölsch"
                        beerStyle="Kölsch"
                        abv={0.053}
                        ibu={ 67 }
                        ebc={ 3 }
                        url="https://s3-eu-west-1.amazonaws.com/beer-recipe-db/reference.recipe.json"
                    />
                </BruiCard>
            </Page>
        )
    }
}

function select() {
  return {}
}

export default connect(select)(RecipeImporter);
