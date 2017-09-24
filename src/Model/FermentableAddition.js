import Fermentable from "./Fermentable";

class FermentableAddition {
    constructor({fermentable, amount}) {
        if (!(fermentable instanceof Fermentable)) {
            throw new Error("[FermentableAddition]: type error");
        }

        this.fermentable = fermentable;
        this.amount = amount;
    }
}

export default FermentableAddition;
