import FermentableType from "./FermentableType";

class Fermentable {
    constructor({
        name,
        type,
        potential_specific_gravity,
        potential_yield,
        color,
        origin,
        supplier,
        coarse_fine_diff,
        diastatic_power,
        protein,
        max_in_batch,
        recommended_mash,
        ibu_gal_per_lb,
    }) {
        if (!name) {
            throw new Error("Missing required field: name");
        }
        if (!type) {
            throw new Error("Missing required field: type");
        }
        if (color === undefined) {
            throw new Error(`Missing or invalid required field: color: ${color}`);
        }

        this.name = name;
        this.color = color;

        if (!FermentableType[type]) {
            throw new Error("Invalid type");
        }

        this.type = type;

        if (potential_yield !== undefined) {
            this.potential_yield = potential_yield;
        }

        if (origin) {
            this.origin = origin;
        }

        if (supplier) {
            this.supplier = supplier;
        }

        if (coarse_fine_diff) {
            this.coarse_fine_diff = coarse_fine_diff;
        }

        if (diastatic_power) {
            this.diastatic_power = diastatic_power;
        }

        if (protein) {
            this.protein = protein;
        }

        if (max_in_batch) {
            this.max_in_batch = max_in_batch;
        }

        if (recommended_mash) {
            this.recommended_mash = recommended_mash;
        }
    }
}

export default Fermentable;
