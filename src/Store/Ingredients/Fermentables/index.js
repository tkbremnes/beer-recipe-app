import idb from "idb";
import uuid from "uuid";
import _ from "underscore";
import Fermentable from "../../../Model/Fermentable";

const ingredientDb = idb.open('Ingredients', 1, upgradeDB => {
    upgradeDB.createObjectStore('Fermentables');
});

function _getKeys() {
    return ingredientDb.then(db => {
        const tx = db.transaction('Fermentables');
        const keys = [];
        const store = tx.objectStore('Fermentables');

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
        return db.transaction('Fermentables')
            .objectStore('Fermentables').get(id);
    })
        .then((_recipe) => {
            const res = _.clone(_recipe);
            res.id = id;
            return res;
        });
}

function unset(id) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Fermentables', 'readwrite');
        tx.objectStore('Fermentables').delete(id);
        return tx.complete;
    })
}

function set(id, item) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Fermentables', 'readwrite');
        tx.objectStore('Fermentables').put(item, id);
        return tx.complete;
    });
}

function add(item) {
    return set(uuid.v4(), item);
}

function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key);
        }))
    }).then((fermentables) => {
        return fermentables.map((_f) => {
            return new Fermentable(_f);
        });
    });
}

export default {
    get,
    set,
    unset,
    getAll,
    add,
}
