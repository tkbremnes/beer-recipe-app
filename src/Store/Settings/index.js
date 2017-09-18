import idb from "idb";

const settingsDb = idb.open('settings', 1, upgradeDB => {
    upgradeDB.createObjectStore('settings');
});

function _getKeys() {
    return settingsDb.then(db => {
        const tx = db.transaction('settings');
        const keys = [];
        const store = tx.objectStore('settings');

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

export function get(id) {
    if (!id) {
        throw new Error("WTF!")
    }
    return settingsDb.then(db => {
        return db.transaction('settings')
            .objectStore('settings').get(id);
    });
}

export function unset(id) {
    return settingsDb.then(db => {
        const tx = db.transaction('settings', 'readwrite');
        tx.objectStore('settings').delete(id);
        return tx.complete;
    })
}

export function set(id, item) {
    return settingsDb.then(db => {
        const tx = db.transaction('settings', 'readwrite');
        tx.objectStore('settings').put(item, id);
        return tx.complete;
    });
}

export function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key).then((value) => {
                return [key, value]
            });
        })).then((items) => {
            const res = {};
            items.forEach((item) => {
                res[item[0]] = item[1];
            });
            return res;
        });
    });
}

export default {
    get,
    set,
    unset,
    getAll,
}
