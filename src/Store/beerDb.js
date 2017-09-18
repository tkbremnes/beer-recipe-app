import idb from "idb";
const _ = require("underscore");

const Recipes = require("./Recipes");

const beerDb = idb.open('beers', 1, upgradeDB => {
    upgradeDB.createObjectStore('beers');
});

function _getBeer(id) {
    return beerDb.then(db => {
        return db.transaction('beers')
            .objectStore('beers').get(id)
    }).then((beer) => {
        const _beer = _.clone(beer);
        _beer.id = id;
        return _beer;
    })
}

export function get(id) {
    return _getBeer(id).then((beer) => {
        if (!beer) {
            return;
        }

        return Recipes.get(beer.recipe_id)
            .then((recipe) => {
                beer.recipe = recipe;
                return beer;
            });
    });
}

function _getKeys() {
    return beerDb.then(db => {
        const tx = db.transaction('beers');
        const keys = [];
        const store = tx.objectStore('beers');

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

export function set(id, item) {
    return beerDb.then(db => {
        const tx = db.transaction('beers', 'readwrite');
        tx.objectStore('beers').put(item, id);
        return tx.complete;
    });
}

export function getAll() {
    return _getKeys().then((keys) => {
        return Promise.all(keys.map((key) => {
            return this.get(key)
        }));
    });
}

export function update(id, fields) {
    return _getBeer(id).then((beer) => {
        if (!beer) {
            return;
        }

        if (fields.status) {
            beer.status = fields.status;
        }

        return this.set(id, beer);
    });
    // return beerDb
    //0bb18724-dc9a-41fe-8617-41d390f999c7
}
