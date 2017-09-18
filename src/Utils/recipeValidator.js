function isValid(recipe) {
    const fieldValidity = this.checkRecipe(recipe);
    return (
        fieldValidity.name &&
        fieldValidity.style &&
        fieldValidity.batch_volume &&
        fieldValidity.fermentables &&
        fieldValidity.yeasts &&
        fieldValidity.hops
    );
}

function normalize(recipe) {
    if (!this.isValid(recipe)) {
        return null;
    }

    const normalisedRecipe = {
        meta: {
            name: recipe.name,
            style: recipe.style,
            source: recipe.source,
            batch_volume: recipe.batch_volume,

            original_gravity: recipe.original_gravity,
            preboil_gravity: recipe.preboil_gravity,
            final_gravity: recipe.final_gravity,

            boil_time: recipe.boil_time || 60,
            boil_volume: recipe.boil_volume,
            description: recipe.description,
        },

        fermentables: recipe.fermentables.filter((_f) => {
            return _f.weight && _f.weight > 0;
        }).map((_f) => {
            return {
                weight: _f.weight,
                fermentable: {
                    name: _f.name,
                    color: _f.color,
                }
            }
        }),

        hops: recipe.hops.filter((_h) => {
            return _h.weight && _h.weight > 0;
        }).map((_h) => {
            return {
                weight: _h.weight,
                time: _h.time,
                hop: {
                    name: _h.name,
                    alpha_acids: _h.aa,
                }
            }
        }),

        yeasts: recipe.yeasts.map((_y) => {
            return {
                yeast: {
                    name: _y.name
                }
            }
        }),
    }

    const filteredFermentationSchedule = recipe.fermentation_schedule.filter((_step) => {
        return _step.time && _step.time > 0;
    }).map((_step) => {
        return {
            label: _step.label,
            time: _step.time,
            temperature: _step.temperature
        }
    });

    const filteredMashSchedule = recipe.mash_schedule.filter((_step) => {
        return _step.temperature;
    }).map((_step) => {
        return {
            label: _step.label,
            time: _step.time,
            temperature: _step.temperature
        }
    });

    if (filteredMashSchedule.length > 0) {
        normalisedRecipe.mash_schedule = filteredMashSchedule;
    }
    if (filteredFermentationSchedule.length > 0) {
        normalisedRecipe.fermentation_schedule = filteredFermentationSchedule;
    }

    return normalisedRecipe;
}

function checkRecipe(recipe) {
    const fields = {
        name: false,
        style: false,
        batch_volume: false,

        fermentables: false,
        yeasts: false,
        hops: false,
    };

    if(recipe.fermentables && recipe.fermentables.length > 0) {
        fields.fermentables = true;
    }

    if(recipe.hops && recipe.hops.length > 0) {
        fields.hops = true;
    }

    if(recipe.yeasts && recipe.yeasts.length > 0) {
        fields.yeasts = true;
    }

    if(recipe.name) {
        fields.name = true;
    }

    if(recipe.style) {
        fields.style = true;
    }

    if(recipe.batch_volume) {
        fields.batch_volume = true;
    }

    return fields;
}

export default {
    checkRecipe,
    isValid,
    normalize
}
