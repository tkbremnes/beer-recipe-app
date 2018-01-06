import {
    RECEIVE_HOPS,
} from "./Actions";

export default function Inventory(state, action) {
    if (!state) {
        return {
            fermentables: [],
            hops: [],
            yeasts: [],
        }
    }

    switch (action.type) {
        case RECEIVE_HOPS: {
            return {
                ...state,
                hops: action.hops
            };
        }

        default: {
            return state;
        }
    }
}
