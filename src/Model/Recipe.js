class FermentationStep {
    constructor({ time, temperature } = {}) {
        this.time = time || 0;
        this.temperature = temperature || 0;
    }
}

class MashStep {
    constructor({ time, temperature } = {}) {
        this.time = time || 0;
        this.temperature = temperature || 0;
    }
}

class Recipe {
    constructor({
        meta,
        fermentables,
        hops,
        yeasts,
    } = {}) {
        this.fermentables = [];
        this.hops = [];
        this.yeasts = [];

        this.fermentation_schedule = [new FermentationStep()];
        this.mash_schedule = [new MashStep({ time: 60, temperature: 67 })];

        this.meta = {
            boil_time: 60,
            boil_volume: "",
            preboil_gravity: 1.000,
            original_gravity: 1.000,
            final_gravity: 1.000,
        };
    }
}

export default Recipe;
