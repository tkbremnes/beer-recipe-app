import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import _ from 'underscore';
import tinseth from 'tinseth';

import uuid from 'uuid';

import clientState from "../Reducers/clientState.js";
import ingredients from "Redux/Ingredients/Reducer";

function uiState(state = {}, action, value) {
  switch(action.type) {
    default: {
      return state;
    }
  }
}

function beerStyles(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_bjcp': {
            return action.bjcp;
        }

        default: {
            return state;
        }
    }
}

function recipeCollection(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_recipe_collection': {
            return action.recipeCollection;
        }

        default: {
            return state;
        }
    }
}

function settings(state, action) {
    if (!state) {
        return {};
    }

    switch(action.type) {
        case "receive_settings": {
            return action.settings;
        }
        default: {
            return state;
        }
    }
}

function userData(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_user_data': {
            return action.userData;
        }

        default: {
            return state;
        }
    }
}

function beerCollection(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_beer_collection': {
            return action.beerCollection;
        }

        default: {
            return state;
        }
    }
}

function beer(state, action) {
    if (!state) {
        return {};
    }
    switch (action.type) {
        case 'receive_beer': {
            const beer = _.clone(action.beer);
            beer.recipe = action.recipe;
            console.log(beer)
            return beer;
        }
        case 'set_state': {
            return state;
        }
        default: {
            return state;
        }
    }
}

function gravityMeasurement(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_gravity_measurements': {
            console.log('yes!');
            console.log(action);
            return action.gravityMeasurements;
        }

        default: {
            return state;
        }
    }
}

function recipe(state, action) {
    if (!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_recipe': {
            return action.recipe || {};
        }

        case 'add_fermentable': {
            const recipe = _.clone(state);
            recipe.fermentables.push(action.fermentable);
            return recipe;
        }

        default: {
            return state;
        }
    }
}

function brewerySettings(state, action) {
    if(!state) {
        return {};
    }

    switch (action.type) {
        case 'receive_brewery_settings':
            return action.brewerySettings
        default:
            return state;
    }
}

function selectedRecipe(state, action) {
    if(!state) {
        return {};
    }

    switch (action.type) {
        case 'set_selected_recipe':
            return action.recipe
        default:
            return state;
    }
}

function beerDraft(state, action) {
    if (!state) {
        return {
            fermentables: [{
                id: uuid.v4()
            }],
            hops: [{
                id: uuid.v4()
            }],
            yeasts: [{
                id: uuid.v4()
            }],
            meta: {}
        };
    }

    switch (action.type) {
        case 'new_beer':{
            return {
                id: uuid.v4(),
                notes: [],
                fermentationGravityMeasurements: []
            }
        }

        case 'update_beer_meta': {
            const beer = _.clone(state);

            beer.meta[action.field] = action.value;

            return beer;
        }

        case 'new_beer_note': {
            const beer = _.clone(state);
            const note = _.clone(action.note);
            note.id = uuid.v4();

            beer.notes.push(note);

            return beer;
        }

        default: {
            return state;
        }
    }
}

function recipeDraft(state, action) {
    if (!state) {
        return {
            fermentables: [{
                id: uuid.v4()
            }],
            hops: [{
                id: uuid.v4()
            }],
            yeasts: [{
                id: uuid.v4()
            }],
            meta: {}
        };
    }

    switch (action.type) {
        case 'new_recipe': {
            return {
                fermentables: [{
                    id: uuid.v4()
                }],
                hops: [{
                    id: uuid.v4()
                }],
                yeasts: [{
                    id: uuid.v4()
                }],
                meta: {
                    id: uuid.v4()
                }
            }
        }

        case 'new_fermentable': {
            const recipe = _.clone(state);
            recipe.fermentables.push({
                id: uuid.v4()
            });
            return recipe;
        }

        case 'new_hop': {
            const recipe = _.clone(state);
            recipe.hops.push({
                id: uuid.v4()
            });
            return recipe;
        }

        case 'new_yeast': {
            const recipe = _.clone(state);
            recipe.yeasts.push({
                id: uuid.v4()
            });
            return recipe;
        }

        case 'update_yeast': {
            const recipe = _.clone(state);

            const yeastPos = recipe.yeasts.findIndex((_yeast) => {
                return _yeast.id === action.yeast.id;
            });

            recipe.yeasts[yeastPos] = action.yeast;

            return recipe;
        }

        case 'update_hop': {
            function calculateIbu(
                postBoilGravity,
                boilSize,
                batchSize,
                aa,
                amount,
                time,
                isPellets,
                maximumUtilizationValue
            ) {
                let res = tinseth(
                    postBoilGravity,
                    boilSize,
                    batchSize,
                    aa,
                    amount,
                    time,
                    maximumUtilizationValue
                );

                if (isPellets) {
                    res = res * 1.1;
                }
                return res;
            }

            const recipe = _.clone(state);

            const hopPos = recipe.hops.findIndex((_hop) => {
                return _hop.id === action.hop.id;
            });

            recipe.hops[hopPos] = action.hop;

            const postBoilGravity = recipe.meta.postBoilGravity || 1.054;
            const boilSize = recipe.meta.boilSize || 25;
            const batchSize = recipe.meta.batchSize || 20;
            const maximumUtilizationValue = recipe.meta.maximumUtilizationValue || 4.15;

            let ibuSum = 0;
            recipe.hops.forEach((_hop) => {
                const isPellets = true;
                ibuSum += calculateIbu(
                    postBoilGravity,
                    boilSize,
                    batchSize,
                    (_hop.aa / 100) || 0,
                    _hop.weight || 0,
                    _hop.time || 0,
                    isPellets,
                    maximumUtilizationValue
                )
            });

            recipe.meta.ibu = ibuSum;

            return recipe;
        }

        case 'update_fermentable': {
            const recipe = _.clone(state);
            const fermentablePos = recipe.fermentables.findIndex((_fermentable) => {
                return _fermentable.id === action.fermentable.id;
            });

            recipe.fermentables[fermentablePos] = action.fermentable;

            let totalWeight = 0;
            recipe.fermentables.forEach((_fermentable) => {
                totalWeight += parseInt(_fermentable.weight, 10) || 0;
            });

            recipe.meta.totalWeight = totalWeight;

            let colorSum = 0;
            recipe.fermentables.forEach((_fermentable) => {
                // TODO
                const weight = 0.00220462262 * _fermentable.weight;
                const color = _fermentable.color / 1.97;
                const volumeInGallons = 13.5;

                const mcu = weight * color / volumeInGallons;

                colorSum += mcu;
            });
            //Morey
            const srm = 1.4922 * Math.pow(colorSum, 0.6859);
            const ebc = srm * 1.97;

            recipe.meta.srm = srm;
            recipe.meta.ebc = Math.round(ebc);
            return recipe;
        }

        case 'update_meta_gravity_fg': {
            const recipe = _.clone(state);
            recipe.meta.fg = parseFloat(action.gravity) || 0;

            const og = recipe.meta.og || 0;
            const fg = recipe.meta.fg || 0;
            const res = ((76.08 * (og-fg) / (1.775-og)) * (fg / 0.794) / 100);
            recipe.meta.abv = res; //.toPrecision(2);

            return recipe;
        }

        case 'update_meta_gravity_og': {
            const recipe = _.clone(state);
            recipe.meta.og = parseFloat(action.gravity) || 0;

            const og = recipe.meta.og || 0;
            const fg = recipe.meta.fg || 0;
            const res = ((76.08 * (og-fg) / (1.775-og)) * (fg / 0.794) / 100);
            recipe.meta.abv = res; //.toPrecision(2);

            return recipe;
        }

        case 'update_meta_gravity_bg': {
            const recipe = _.clone(state);
            recipe.meta.bg = parseFloat(action.gravity) || 0;

            return recipe;
        }
        case 'update_meta_name': {
            const recipe = _.clone(state);
            recipe.meta.name = action.name;

            return recipe;
        }
        case 'update_meta_source': {
            const recipe = _.clone(state);
            recipe.meta.source = action.source;

            return recipe;
        }
        case 'update_meta_boil_volume': {
            const recipe = _.clone(state);
            recipe.meta.boilVolume = action.volume;

            return recipe;
        }
        case 'update_meta_batch_volume': {
            const recipe = _.clone(state);
            recipe.meta.batchVolume = action.volume;

            return recipe;
        }
        case 'update_meta_boil_time': {
            const recipe = _.clone(state);
            recipe.meta.boilTime = action.time;

            return recipe;
        }
        case 'update_meta_mash_time': {
            const recipe = _.clone(state);
            recipe.meta.mashTime = action.time;
            return recipe;
        }
        case 'update_meta_style': {
            const recipe = _.clone(state);
            recipe.meta.style = action.style;

            return recipe;
        }
        case 'update_meta_friendly_id': {
            const recipe = _.clone(state);
            recipe.meta.friendlyId = action.id;

            return recipe;
        }
        case 'update_meta_mash_temp': {
            const recipe = _.clone(state);
            recipe.meta.mashTemp = action.temp;

            return recipe;
        }
        case 'update_meta_fermentation_temp': {
            const recipe = _.clone(state);
            recipe.meta.fermentationTemp = action.temp;

            return recipe;
        }
        case 'update_meta_fermentation_time': {
            const recipe = _.clone(state);
            recipe.meta.fermentationTime = action.time;

            return recipe;
        }

        default: {
            return state;
        }
    }
}




const brewStore = combineReducers({
  recipe,
  brewerySettings,
  recipeCollection,
  recipeDraft,
  beerDraft,
  beer,
  beerCollection,
  gravityMeasurement,
  uiState,
  userData,
  selectedRecipe,
  beerStyles,
  settings,

    clientState,
    ingredients,
});


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

let store = createStoreWithMiddleware(brewStore);

window.newStore = store;

export default store;
