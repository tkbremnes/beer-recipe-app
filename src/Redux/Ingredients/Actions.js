import FermentablesStore from "Store/Ingredients/Fermentables";
import HopsStore from "Store/Ingredients/Hops";
import YeastsStore from "Store/Ingredients/Yeasts";

export const RECEIVE_FERMENTABLES = "RECEIVE_FERMENTABLES";
function receiveFermentables(fermentables) {
    return {
        type: RECEIVE_FERMENTABLES,
        fermentables,
    }
}

export const RECEIVE_HOPS = "RECEIVE_HOPS";
function receiveHops(hops) {
    return {
        type: RECEIVE_HOPS,
        hops,
    }
}

export const RECEIVE_YEASTS = "RECEIVE_YEASTS";
function receiveYeasts(yeasts) {
    return {
        type: RECEIVE_YEASTS,
        yeasts,
    }
}

export function fetchIngredients() {
    return (dispatch) => {
        return FermentablesStore.getAll().then((fermentables) => {
            dispatch(receiveFermentables(fermentables));
        }).then(() => {
            return HopsStore.getAll().then((hops) => {
                dispatch(receiveHops(hops));
            });
        }).then(() => {
            return YeastsStore.getAll().then((yeasts) => {
                dispatch(receiveYeasts(yeasts));
            });
        })
    };
}
