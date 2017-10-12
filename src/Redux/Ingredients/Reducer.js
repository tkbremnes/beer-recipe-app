import {
    RECEIVE_FERMENTABLES,
} from "./Actions";

export default function Ingredients(state, action) {
    if (!state) {
        return {
            fermentables: [],
        }
    }

    switch (action.type) {
        case RECEIVE_FERMENTABLES: {
            return {
                ...state,
                fermentables: action.fermentables
            };
        }

        default: {
            return state;
        }
    }
}
