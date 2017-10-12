import FermentablesStore from "Store/Ingredients/Fermentables";

export const RECEIVE_FERMENTABLES = "RECEIVE_FERMENTABLES";
function receiveFermentables(fermentables) {
    return {
        type: RECEIVE_FERMENTABLES,
        fermentables,
    }
}

export function fetchIngredients() {
    return (dispatch) => {
        return FermentablesStore.getAll().then((fermentables) => {
            dispatch(receiveFermentables(fermentables));
        });
    };
}
