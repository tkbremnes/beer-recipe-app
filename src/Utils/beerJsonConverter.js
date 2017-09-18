export default {
    toRecipeJson: (recipe) => {
        const temp = {
            id: recipe.meta.id, // missing
            name: recipe.meta.name,
            source: recipe.meta.source,

            style: recipe.meta.style,

            og: recipe.meta.og,
            bg: recipe.meta.bg,
            fg: recipe.meta.fg,

            ibu: recipe.meta.ibu,
            abv: recipe.meta.abv,
            ebc: recipe.meta.ebc,

            batch_volume: recipe.meta.batchVolume,

            boil_volume: recipe.meta.boilVolume,
            boil_time: recipe.meta.boilTime,

            mashing_schedule: [
                {
                    temperature: recipe.meta.mashTemp,
                    time: recipe.meta.mashTime,
                }
            ],

            fermentation_schedule: {
                primary: {
                    temperature: recipe.meta.fermentationTemp,
                    time: recipe.meta.fermentationTime,
                },
            },

            fermentables: recipe.fermentables
                .filter((_f) => {
                    return !!(_f.name && _f.weight);
                }).map(_f => {
                    return {
                        name: _f.name,
                        weight: _f.weight,
                        color: _f.color
                    }
                }),

            hops: recipe.hops
                .filter((_h) => {
                    return !!(_h.name && _h.weight && _h.time);
                })
                .map(_h => {
                    return {
                        "name": _h.name,
                        "weight": _h.weight,
                        "time": _h.time,
                        "aa": _h.aa
                    }
                }),

            yeasts: recipe.yeasts
                .filter((_y) => {
                    return !!(_y.name);
                })
                .map(_y => {
                    return {
                        "name": _y.name,
                        // "id": _y.id, // uses an internal ID
                        "producer": _y.producer
                    }
                })
        }

        const res = {};
        Object.keys(temp).forEach((fieldName) => {
            if (temp[fieldName]) {
                res[fieldName] = temp[fieldName];
            }
        });

        return res;
    }
}
