import {
    HIDE_APP_SIDEBAR,
    SHOW_APP_SIDEBAR,
    SET_APP_HEADER_TEXT
} from "../Actions.js";

export default function clientState(state, action) {
    if(!state) {
        return {
            isSidebarOpen: false
        }
    }

    switch(action.type) {
        case HIDE_APP_SIDEBAR: {
            const newState = Object.assign({}, state);
            newState.isSidebarOpen = false;
            return newState;
        }
        case SHOW_APP_SIDEBAR: {
            const newState = Object.assign({}, state);
            newState.isSidebarOpen = true;
            return newState;
        }
        case SET_APP_HEADER_TEXT: {
            const newState = Object.assign({}, state);
            newState.appHeaderText = action.text;
            return newState;
        }

        default: {
            return state;
        }
    }
}
