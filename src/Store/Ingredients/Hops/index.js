import idb from "idb";
import _ from "underscore";
import uuid from "uuid";
import Hop from "Model/Hop";

const ingredientDb = idb.open('Ingredients', 1, upgradeDB => {
    upgradeDB.createObjectStore('Hops');
});

function _getKeys() {
    return ingredientDb.then(db => {
        const tx = db.transaction('Hops');
        const keys = [];
        const store = tx.objectStore('Hops');

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
        return db.transaction('Hops')
            .objectStore('Hops').get(id);
    })
        .then((_recipe) => {
            const res = _.clone(_recipe);
            res.id = id;
            return res;
        });
}

function unset(id) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Hops', 'readwrite');
        tx.objectStore('Hops').delete(id);
        return tx.complete;
    })
}

function set(id, item) {
    return ingredientDb.then(db => {
        const tx = db.transaction('Hops', 'readwrite');
        tx.objectStore('Hops').put(item, id);
        return tx.complete;
    });
}

function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key);
        }))
    }).then((hops) => {
        return hops.map((_h) => {
            return new Hop(_h);
        });
    });
}

function add(item) {
    return set(uuid.v4(), item);
}
export default {
    get,
    set,
    unset,
    getAll,
}
