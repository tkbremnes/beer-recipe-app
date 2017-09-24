export const TYPE = {
    ALE: "ALE",
    LAGER: "LAGER",
    HYBRID: "HYBRID",
};

export const FORM = {
    LIQUID: "LIQUID",
    DRY: "DRY",
    SLURRY: "SLURRY",
};

class Yeast {
    constructor(
        name,
        product_id,
        laboratory,
        volume,
        form,
        type,
        attenuation,
        flocculation,
        temperature,
        tolerance
    ) {
        if (!name) {
            throw new Error("missing parameters");
        }
        this.name = name;

        if (product_id) {
            this.product_id = product_id;
        }

        if (laboratory) {
            this.laboratory = laboratory;
        }

        if (form) {
            this.form = form;
        }

        if (type) {
            this.type = type;
        }

        if (attenuation) {
            this.attenuation = attenuation;
        }

        if (flocculation) {
            this.flocculation = flocculation;
        }

        if (temperature) {
            this.temperature = temperature;
        }

        if (tolerance) {
            this.tolerance = tolerance;
        }
    }
}

export default Yeast;
