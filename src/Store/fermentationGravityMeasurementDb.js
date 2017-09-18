const fermentationGravityMeasurement = idb.open('fermentation_gravity_measurements', 1, upgradeDB => {
    upgradeDB.createObjectStore('fermentation_gravity_measurements');
});

export function get(id) {
    console.log(id);
    return fermentationGravityMeasurement.then(db => {
        return db.transaction('fermentation_gravity_measurements')
            .objectStore('fermentation_gravity_measurements').get(id);
    });
}

export function set(id, item) {
    return fermentationGravityMeasurement.then(db => {
        const tx = db.transaction('fermentation_gravity_measurements', 'readwrite');
        tx.objectStore('fermentation_gravity_measurements').put(item, id);
        return tx.complete;
    });
}

export function update(id, fields) {
    // return fermentationGravityMeasurement
    //0bb18724-dc9a-41fe-8617-41d390f999c7
}
