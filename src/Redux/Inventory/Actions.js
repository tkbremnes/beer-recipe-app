import HopsStore from "Store/Inventory/Hops";

export const RECEIVE_HOPS = "INVENTORY/RECEIVE_HOPS";
function receiveHops(hops) {
    return {
        type: RECEIVE_HOPS,
        hops,
    }
}

export function fetchInventory() {
    return (dispatch) => {
        return HopsStore.getAll().then((hops) => {
            dispatch(receiveHops(hops));
        });
    };
}
