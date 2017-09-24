import FermentableType from "./FermentableType";

class Fermentable {
    constructor({
        name,
        type,
        potential_specific_gravity,
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
        if (!(name && type && color)) {
            throw new Error("Missing required field");
        }

        this.name = name;
        this.color = color;

        if (!FermentableType[type]) {
            throw new Error("Invalid type");
        }

        this.type = type;

        if (potential_specific_gravity) {
            this.potential_specific_gravity = potential_specific_gravity;
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
