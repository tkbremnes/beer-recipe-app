import uuid from 'uuid';

import Utils from "./Utils/Utils.js";
import Settings from './Store/Settings';
import Recipes from "./Store/Recipes";

export const SHOW_APP_SIDEBAR = "SHOW_APP_SIDEBAR";
export function showAppSidebar() {
    return (dispatch) => {
        dispatch({
            type: SHOW_APP_SIDEBAR
        });
    }
}

export const SET_APP_HEADER_TEXT = "SET_APP_HEADER_TEXT";
export function setAppHeaderText(text) {
    return (dispatch) => {
        dispatch({
            type: SET_APP_HEADER_TEXT,
            text
        });
    }
}

export const HIDE_APP_SIDEBAR = "HIDE_APP_SIDEBAR";
export function hideAppSidebar() {
    return (dispatch) => {
        dispatch({
            type: HIDE_APP_SIDEBAR
        });
    }
}

export const RECEIVE_RECIPE = 'receive_recipe'
function receiveRecipe(recipe) {
    return {
        type: RECEIVE_RECIPE,
        recipe
    }
}

export const NEW_RECIPE = "NEW_RECIPE";
export function createNewRecipe() {
    return (dispatch) => {
        dispatch({
            type: NEW_RECIPE
        });
    }
}

export const RECEIVE_RECIPE_COLLECTION = 'receive_recipe_collection'
function receiveRecipeCollection(_collection) {
    const recipeCollection = _collection.map((_r) => {
      _r["_meta"] = Utils.calculateRecipeMeta(_r);
      return _r;
    });

    return {
        type: RECEIVE_RECIPE_COLLECTION,
        recipeCollection: {
            recipes: recipeCollection
        }
    }
}

export function saveRecipe(recipe) {
    return (dispatch) => {
        const id = uuid.v4();
        const _recipe = Object.assign({}, recipe);
        _recipe.id = id;

        return Recipes.set(id, _recipe).then(() => {
            return Recipes.getAll().then((recipeCollection) => {
                return dispatch(receiveRecipeCollection(recipeCollection));
            });
        }).then(() => {
            return _recipe;
        });
    }
}

export function fetchRecipe(id) {
    return (dispatch) => {
        return Recipes.get(id).then((recipe) => {
            recipe["_meta"] = Utils.calculateRecipeMeta(recipe);

            return dispatch(receiveRecipe(recipe));
        });
    }
}

export function importRecipe(recipe) {
    return (dispatch) => {
        const id = uuid.v4();
        const _recipe = Object.assign({}, recipe.recipe);
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

function receiveSettings(settings) {
    return {
        type: "receive_settings",
        settings,
    }
}

export function getSettings() {
    return (dispatch) => {
        return Settings.getAll().then((settings) => {
            return dispatch(receiveSettings(settings));
        });
    }
}

export default {};
