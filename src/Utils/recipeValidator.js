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
    const totalFermentableWeight = recipe.fermentables.reduce((sum, fermentableAddition) => {
        return sum + fermentableAddition.weight;
    }, 0);

    return {
        fermentables: recipe.fermentables.map((fermentableAddition) => {
            return {
                amount: fermentableAddition.weight / totalFermentableWeight,
                fermentable: fermentableAddition.fermentable,
            }
        }),
        hops: recipe.hops.map((hopAddition) => {
            return {
                amount: hopAddition.weight / recipe.batch_volume,
                time: hopAddition.time,
                form: hopAddition.form,
                hop: hopAddition.hop,
            };
        }),
        yeasts: recipe.yeasts.map((yeastAddition) => {
            return {
                yeast: yeastAddition
            };
        }),
        meta: {
            name: recipe.name,
            source: recipe.source,
            style: recipe.style,
            original_gravity: recipe.original_gravity,
            final_gravity: recipe.final_gravity,
            comment: recipe.description && recipe.description.body,
            boil_time: recipe.boil_time || 60,
        },
        mash_schedule: [],
        fermentation_schedule: [],
    }
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
    normalize,
}
