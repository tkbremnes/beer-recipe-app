import {
    RECEIVE_FERMENTABLES,
    RECEIVE_HOPS,
    RECEIVE_YEASTS,
} from "./Actions";

export default function Ingredients(state, action) {
    if (!state) {
        return {
            fermentables: [],
            hops: [],
            yeasts: [],
        }
    }

    switch (action.type) {
        case RECEIVE_FERMENTABLES: {
            return {
                ...state,
                fermentables: action.fermentables
            };
        }

        case RECEIVE_HOPS: {
            return {
                ...state,
                hops: action.hops
            };
        }

        case RECEIVE_YEASTS: {
            return {
                ...state,
                yeasts: action.yeasts
            };
        }

        default: {
            return state;
        }
    }
}
