import _ from 'underscore';
import uuid from 'uuid';

import Utils from "./Utils";
import Recipes from "../Store/Recipes";

const idb = require("idb");
window.idb = idb;

const beerDb = require('../Store/beerDb');
const settingsDb = require('../Store/Settings');

export const FETCH_BJCP = 'fetch_bjcp';
export const RECEIVE_BJCP = 'receive_bjcp';
export function fetchBjcp() {
    return (dispatch) => {
        return {
          RECEIVE_BJCP,
          bjcp: {}
        }
        // return fetch('bjcp.json').then(response => response.json()).then((res) => {
        //     const categoryKeys = Object.keys(res);
        //     const obj = {};
        //
        //     categoryKeys.forEach((key) => {
        //         const category = res[key];
        //         const subcategoryKeys = Object.keys(category.subcategories);
        //
        //         subcategoryKeys.forEach((subkey) => {
        //             const subcategory = category.subcategories[subkey];
        //
        //
        //             obj[subkey] = subcategory;
        //
        //         });
        //     });
        //
        //     return dispatch({
        //         type: RECEIVE_BJCP,
        //         bjcp: obj
        //     });
        // });
    }
}

export function saveBeer(beer) {
    return (dispatch) => {
        const beerId = uuid.v4();
        // const beerDbObj = {
        //     id: beerId,
        //     brewed: beer.brewed,
        //     recipe: beer.recipeId,
        //     status: beer.status
        // }

        return beerDb.set(beerId, beer);
    }
}

export const NEW_BEER = 'new_beer';
export function createNewBeer() {
    return (dispatch) => {
        dispatch({type: NEW_BEER});
    }
}

export const NEW_BEER_NOTE = 'new_beer_note';
export function createNewBeerNote(note) {
    return (dispatch) => {
        dispatch({
            type: NEW_BEER_NOTE,
            note
        });
    }
}

export function fetchFermentationGravityMeasurements(beerId) {
    // // TODO
    // const CONSTANTS = {
    //     FERMENTATION_GRAVITY_MEASUREMENTS: 'fermentation_gravity_measurements'
    // }
    // return (dispatch) => {
    //     const beersRef = db.ref("beers");
    //     const fermGravRef = db.ref("gravity_measurements");
    //
    //     const linked = beersRef.child(beerId).child(CONSTANTS.FERMENTATION_GRAVITY_MEASUREMENTS);
    //
    //     return linked.once("value").then((snapshot) => {
    //         const ids = snapshot.val();
    //         const promiseArray = snapshot.val().map((measurementId) => {
    //             return fermGravRef.child(measurementId).once('value').then((snap) => {
    //                 const value = snap.val();
    //                 value.id = snap.getKey();
    //                 return value;
    //             });
    //         });
    //         return Promise.all(promiseArray).then((results) => {
    //             return dispatch({
    //                 type: 'receive_gravity_measurements',
    //                 gravityMeasurements: results
    //             });
    //         });
    //     });
    // };
}

export const RECEIVE_BEER = 'receive_beer'
function receiveBeer(thing) {
    console.log(thing)
    return {
        type: RECEIVE_BEER,
        beer: thing.beer,
        recipe: thing.beer.recipe
    }
}

// let db;
// if (window.firebase) {
//     db = window.firebase.database();
// }

export function fetchBeer(id) {
    return (dispatch) => {
        return beerDb.get(id).then((beer) => {
            if (!beer) {
                return dispatch(receiveBeer({beer:{}}));
            }

            return dispatch(receiveBeer({
                beer
            }));
        });
    }
}
window.setStatus = (status) => {
    return beerDb.update("0bb18724-dc9a-41fe-8617-41d390f999c7", { status });
}

// export function fetchBeer(id) {
//     const ref = db.ref(`beers/${ id }`);
//     return (dispatch) => {
//         return ref.once('value').then((_beerSnapshot) => {
//             const beer = _beerSnapshot.val();
//
//             const recipeRef = db.ref(`users/${ getUserId() }/recipes/${ beer.recipe }`);
//
//             return recipeRef.once('value').then((_recipeSnapshot) => {
//                 const recipeUrl = _recipeSnapshot.val();
//
//                 return fetch(recipeUrl).then(res => res.json()).then((recipe) => {
//                     return dispatch(receiveBeer({beer, recipe}));
//                 });
//             });
//         });
//     }
// }

export function fetchUserData() {
    return (dispatch) => {
        return Recipes.getAll().then((recipeCollection) => {
            dispatch(receiveRecipeCollection(recipeCollection));
        });
    };


    // if (!db) {
    //     return {};
    // }
    //
    // // TODO: this should be race between internal and external db
    // const dbRef = db.ref('/users/' + getUserId());
    // return (dispatch) => {
    //     return Recipes.getAll().then((recipeCollection) => {
    //         dispatch(receiveRecipeCollection(recipeCollection));
    //     });
    //
    //     return dbRef.once('value', (snapshot) => {
    //
    //         const beerUrls = snapshot.val().beersv2;
    //         Promise.all(Object.keys(beerUrls).map((beerId) => {
    //             const beerUrl = beerUrls[beerId];
    //             return fetch(beerUrl).then(response => response.json()).then((beer) => {
    //                 beer.id = beerId;
    //                 return beer;
    //             });
    //         }))
    //         // .then((res) => {
    //         //     dispatch(receiveBeerCollection({beer: res}));
    //         // });
    //
    //         // const beers = snapshot.val().beers;
    //         // Promise.all(beers.map((beer) => {
    //         //     const beerDbRef = db.ref(`/beers/${ beer }`);
    //         //     return beerDbRef.once('value').then((snapshot) => {
    //         //         return snapshot.val();
    //         //     });
    //         // })).then((res) => {
    //         //     dispatch(receiveBeerCollection({beer: res}));
    //         // });
    //
    //         dispatch(receiveUserData(snapshot.val()));
    //
    //         const recipeUrls = snapshot.val().recipes;
    //         Promise.all(Object.keys(recipeUrls).map((recipeId) => {
    //             const recipeUrl = recipeUrls[recipeId];
    //             return fetch(recipeUrl).then(response => response.json()).then((recipe) => {
    //                 recipe.id = recipeId;
    //                 return recipe;
    //             });
    //         })).then((res) => {
    //             dispatch(receiveRecipeCollection(res))
    //         });
    //     });
    // }
}
export const RECEIVE_USER_DATA = 'receive_user_data';
export function receiveUserData(userData) {
    return {
        type: RECEIVE_USER_DATA,
        userData
    }
}

export function storeBeerData(id, data) {
    // return Recipes.rel.find('beer', id).then((rel) => {
    //     const beer = _.clone(rel.beer[0]);
    //     beer[data.label] = data.value;
    //     return Recipes.rel.save('beer', beer);
    // });
}

export function fetchBeerCollection(collectionArray) {
    return (dispatch) => {
        return beerDb.getAll().then((beerCollection) => {
            console.log(beerCollection);
            return dispatch(receiveBeerCollection({beer: beerCollection}));
        });
    }
}

export const RECEIVE_BEER_COLLECTION = 'receive_beer_collection'
function receiveBeerCollection(beerCollection) {
    return {
        type: RECEIVE_BEER_COLLECTION,
        beerCollection
    }
}


// export const RECEIVE_RECIPE = 'receive_recipe'
// function receiveRecipe(recipe) {
//     return {
//         type: RECEIVE_RECIPE,
//         recipe
//     }
// }

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

export const RECEIVE_BREWERY_SETTINGS = 'receive_brewery_settings'
function receiveBrewerySettings(brewerySettings) {
    return {
        type: RECEIVE_BREWERY_SETTINGS,
        brewerySettings
    }
}

export function fetchRecipeCollection(recipeCollectionArray) {
    // recipeCollectionArray.forEach((recipeUrl) => {
    //     fetch(recipeUrl).then(response => response.json()).then((recipeJson) => {
    //         console.log(recipeJson);
    //     });
    // });
    //
    // return (dispatch) => {
    //     return Recipes.rel.find('recipe').then((result) => {
    //         const recipes = result.recipes;
    //         return dispatch(receiveRecipeCollection(recipes));
    //     }).catch((err) => {
    //         console.error(err);
    //     });
    // }
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
window.deleteRecipeForId = (recipeId) => {
    return Recipes.unset(recipeId);
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

const brewhouseDb = idb.open('brewhouse', 1, upgradeDB => {
    upgradeDB.createObjectStore('brewhouse');
});

const idbKeyVal = {
    get(key) {
        return brewhouseDb.then(db => {
            return db.transaction('brewhouse')
                .objectStore('brewhouse').get(key);
        });
    },
    set(key, val) {
        return brewhouseDb.then(db => {
            const tx = db.transaction('brewhouse', 'readwrite');
            tx.objectStore('brewhouse').put(val, key);
            return tx.complete;
        });
    }
};

window.idbKeyVal = idbKeyVal;

export function saveFermentationGravityMeasurement() {}

export function fetchBrewerySettings() {
    return (dispatch) => {
        return idbKeyVal.get("meta").then((res) => {
            return dispatch(receiveBrewerySettings({meta: res || {}}));
        });
    }
}

export default {
};
