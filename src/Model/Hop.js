export const FORM = {
    PELLETS: "PELLET",
    PLUG: "PLUG",
    LEAF: "LEAF",
}

export const TYPE = {
    BITTERING: "BITTERING",
    AROMA: "AROMA",
    BOTH: "BOTH",
}

export const USE = {
    BOIL: "BOIL",
    DRY_HOP: "DRY_HOP",
    MASH: "MASH",
    FIRST_WORT: "FIRST_WORT",
}

class Hop {
    constructor({name,
        alpha_acids,
        origin,
        form,
        type,
        beta_acids,
        hop_stability_index,
        humulene,
        caryophyllene,
        cohumulone,
        myrcene
    }) {
        if (!name) {
            throw new Error("missing parameters");
        }

        this.name = name;

        if (type) {
            this.type = type;
        }

        if (form) {
            this.form = form;
        }

        if (alpha_acids) {
            this.alpha_acids = alpha_acids;
        }

        if (origin) {
            this.origin = origin;
        }

        if (beta_acids) {
            this.beta_acids = beta_acids;
        }

        if (hop_stability_index) {
            this.hop_stability_index = hop_stability_index;
        }

        if (humulene) {
            this.humulene = humulene;
        }

        if (caryophyllene) {
            this.caryophyllene = caryophyllene;
        }

        if (cohumulone) {
            this.cohumulone = cohumulone;
        }

        if (myrcene) {
            this.myrcene = myrcene;
        }
    }
}

export default Hop;
