import idb from "idb";
import _ from "underscore";
import Yeast from "../../../Model/Yeast";

const ingredientDb = idb.open('Ingredients', 1, upgradeDB => {
    upgradeDB.createObjectStore('Yeasts');
});

function _getKeys() {
    return ingredientDb.then(db => {
        const tx = db.transaction('Yeasts');
        const keys = [];
        const store = tx.objectStore('Yeasts');

        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // openKeyCursor isn't supported by Safari, so we fall back
        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
            if (!cursor) return;

            keys.push(cursor.key);
            cursor.continue();
        });

        return tx.complete.then(() => keys);
    });
}

function get(id) {
    if (!id) {
        throw new Error("No matching ID found");
    }
    return ingredientDb.then(db => {
        return db.transaction('Yeasts')
            .objectStore('Yeasts').get(id);
    })
        .then((_recipe) => {
            const res = _.clone(_recipe);
            res.id = id;
            return res;
        });
}

function unset(id) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Yeasts', 'readwrite');
        tx.objectStore('Yeasts').delete(id);
        return tx.complete;
    })
}

function set(id, item) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Yeasts', 'readwrite');
        tx.objectStore('Yeasts').put(item, id);
        return tx.complete;
    });
}

function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key);
        }))
    }).then((yeasts) => {
        return yeasts.map((_y) => {
            return new Yeast(_y);
        });
    });
}

export default {
    get,
    set,
    unset,
    getAll,
}
