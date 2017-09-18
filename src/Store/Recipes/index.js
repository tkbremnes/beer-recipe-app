import idb from "idb";

const settingsDb = idb.open("Recipes", 1, upgradeDB => {
    upgradeDB.createObjectStore("Recipes");
});

function _getKeys() {
    return settingsDb.then(db => {
        const tx = db.transaction("Recipes");
        const keys = [];
        const store = tx.objectStore("Recipes");

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
    return settingsDb.then(db => {
        return db.transaction("Recipes")
            .objectStore("Recipes").get(id);
    });
}

function unset(id) {
    return settingsDb.then(db => {
        const tx = db.transaction("Recipes", 'readwrite');
        tx.objectStore("Recipes").delete(id);
        return tx.complete;
    })
}

function set(id, item) {
    return settingsDb.then(db => {
        const tx = db.transaction("Recipes", 'readwrite');
        tx.objectStore("Recipes").put(item, id);
        return tx.complete;
    });
}

function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key);
            // TODO: new Recipe() on the result
        }));
    });
}

export default {
    get,
    set,
    unset,
    getAll,
}
