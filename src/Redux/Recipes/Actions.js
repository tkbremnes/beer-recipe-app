import _ from 'underscore';
import uuid from 'uuid';

import Recipes from "../../Store/Recipes";

import FermentableAddition from "../../Model/FermentableAddition";
import Fermentable from "../../Model/Fermentable";


function enrichRecipe(recipe) {
    return {
        meta: recipe.meta,
        id: recipe.id,

        fermentables: recipe.fermentables.map((addition) => {
            const fermentable = new Fermentable(addition.fermentable);
            return new FermentableAddition({
                fermentable,
                amount: addition.amount
            });
        }),
        hops: recipe.hops,
        yeasts: recipe.yeasts,

        fermentation_schedule: recipe.fermentation_schedule,
        mash_schedule: recipe.mash_schedule,

    };
}

export const RECEIVE_RECIPE_COLLECTION = 'receive_recipe_collection'
function receiveRecipeCollection(_collection) {
    const recipeCollection = _collection.map((_r) => {
        //   _r["_meta"] = Utils.calculateRecipeMeta(_r);
        return _r;
    });

    return {
        type: RECEIVE_RECIPE_COLLECTION,
        recipeCollection: {
            recipes: recipeCollection
        }
    }
}


export function deleteRecipeForId(recipeId) {
    return (dispatch) => {
        return Recipes.unset(recipeId).then(() => {
            return Recipes.getAll().then((recipeCollection) => {
                return dispatch(receiveRecipeCollection(recipeCollection));
            });
        });
    }
}

export function updateRecipe(id, recipe) {
    return (dispatch) => {

        return Recipes.unset(id).then(() => {
            const _recipe = _.clone(recipe);
            const id = uuid.v4();
            _recipe.id = id;

            return Recipes.set(id, _recipe);
        });

        // return Recipes.set(id, _recipe);
    }
}

export function importRecipe(recipe) {
    return (dispatch) => {
        const id = uuid.v4();
        const _recipe = _.clone(recipe.recipe);
        _recipe.id = id;

        return Recipes.set(id, _recipe).then(() => {
            return Recipes.getAll().then((recipeCollection) => {
                dispatch(receiveRecipeCollection(recipeCollection));
            });
        }).then(() => {
            return _recipe;
        });
    }
}


export function fetchRecipes() {
    return (dispatch) => {
        return Recipes.getAll().then((recipeCollection) => {
            dispatch(receiveRecipeCollection(recipeCollection.map(enrichRecipe)));
        });
    };
}
