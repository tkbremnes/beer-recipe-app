import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import RecipeDetail from '../RecipeDetail';
import BruiCard from '../BruiCard';
import BruiFloatingAddButton from '../BruiFloatingAddButton';

import {
    deleteRecipeForId
} from '../../Redux/Recipes/Actions';

import {
    setAppHeaderText
} from "../../Actions";

import RecipeListItem from '../RecipeListItem';
import BruiListItemDivider from '../BruiListItemDivider/index.jsx';

class RecipeCollection extends React.Component {
    componentWillMount() {
        this.props.dispatch(setAppHeaderText("Recipes"))
    }
    goToRecipeCreator() {
        return this.props.history.push(`/recipes/new`);
    }

    goToRecipeImporter() {
        return this.props.history.push(`/recipes/import`);
    }

    deleteRecipe(recipe) {
      this.props.dispatch(deleteRecipeForId(recipe.id)).then(() => {
        this.props.history.push(`/recipes/`);
      });
    }

    renderRecipeForId(recipeId) {
        if (!recipeId) {
            return;
        }

        const selectedRecipe = this.props.recipeCollection.recipes.find((_r) => {
            return _r.id === recipeId;
        });
        if (!selectedRecipe) {
            return <div>Error</div>;
        }

        return <RecipeDetail recipe={ selectedRecipe } onDelete={ this.deleteRecipe.bind(this, selectedRecipe) }></RecipeDetail>
    }

    render() {
        if (!this.props.recipeCollection.recipes) {
            return (
                <div className="card-container">
                    <BruiCard>
                        Loading recipes. Crack open a <span role="img" aria-label="beer">🍺</span> while you are waiting.
                    </BruiCard>
                </div>
            )
        }

        if(this.props.recipeCollection.recipes.length === 0) {
            return (
                <div className="card-container">
                    <BruiCard>
                        No recipes. Make a new one?
                    </BruiCard>

                    <BruiFloatingAddButton
                        onClick={ this.goToRecipeImporter.bind(this) }
                    ></BruiFloatingAddButton>
                </div>
            )
        }

        const hasSelectedRecipe = !!this.props.match.params.recipeId;

        function renderRecipeStyleCollection(_recipes) {
            return (
                <div key={ Math.random() }>
                    <BruiListItemDivider>
                        { _recipes.style }
                    </BruiListItemDivider>

                    { _recipes.recipes.map((item) => {
                        const recipe = Object.assign({}, item);

                        return <RecipeListItem key={recipe.id} recipe={ recipe } />
                    }) }
                </div>
            )
        }

        function sortRecipesOnStyle(recipeCollection) {
            const res = [];
            _.each(_.groupBy(recipeCollection, (_recipe) => {
                return _recipe.meta.style.name;
            }), (_recipes, _style) => {
                res.push({
                    style: _style,
                    recipes: _recipes
                })
            });
            return res.sort((a, b) => {
                return a.style > b.style;
            });
        }

        return (
            <div className={ hasSelectedRecipe ? "recipe-collection recipe-selected" : "recipe-collection" }>
                <div
                    className="master"
                >
                  <div style={{ padding: "0px 8px" }}>
                    { sortRecipesOnStyle(this.props.recipeCollection.recipes).map((_obj) => {
                      return renderRecipeStyleCollection(_obj);
                    }) }
                  </div>

                  <BruiFloatingAddButton
                        onClick={ this.goToRecipeImporter.bind(this) }
                    ></BruiFloatingAddButton>
                </div>

                <div
                    className="detail"
                >
                    { this.renderRecipeForId.call(this, this.props.match.params.recipeId) }
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        recipeCollection: state.recipeCollection,
        selectedRecipe: state.selectedRecipe,
        beerStyles: state.beerStyles
    }
}

export default connect(select)(RecipeCollection);
