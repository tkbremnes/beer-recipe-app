import uuid from 'uuid';

const beerDb = require('../Store/beerDb');
const settingsDb = require('../Store/Settings');

export function saveBeer(beer) {
    return (dispatch) => {
        const beerId = uuid.v4();
        return beerDb.set(beerId, beer);
    }
}

export const NEW_BEER = 'new_beer';
export function createNewBeer() {
    return (dispatch) => {
        dispatch({ type: NEW_BEER });
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

export const RECEIVE_BEER = 'receive_beer'
function receiveBeer(thing) {
    return {
        type: RECEIVE_BEER,
        beer: thing.beer,
        recipe: thing.beer.recipe
    }
}

export function fetchBeer(id) {
    return (dispatch) => {
        return beerDb.get(id).then((beer) => {
            if (!beer) {
                return dispatch(receiveBeer({ beer: {} }));
            }

            return dispatch(receiveBeer({
                beer
            }));
        });
    }
}

export function fetchBeerCollection(collectionArray) {
    return (dispatch) => {
        return beerDb.getAll().then((beerCollection) => {
            console.log(beerCollection);
            return dispatch(receiveBeerCollection({ beer: beerCollection }));
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

export default {
};
