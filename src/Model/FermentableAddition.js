import Fermentable from "./Fermentable";

class FermentableAddition {
    constructor({fermentable, weight}) {
        if (!(fermentable instanceof Fermentable)) {
            throw new Error("[FermentableAddition]: type error");
        }

        this.fermentable = fermentable;
        this.weight = weight;
    }
}

export default FermentableAddition;
