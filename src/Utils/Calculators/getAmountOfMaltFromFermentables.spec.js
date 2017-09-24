import getAmountOfMaltFromFermentables from "./getAmountOfMaltFromFermentables";

describe("getAmountOfMaltFromFermentables", () => {
    it("should return the correct result (1)", () => {
        const fermentables = [
            {
                amount: 0.9,
                fermentable: {
                    potential_yield: 0.75445,
                }
            },
            {
                amount: 0.1,
                fermentable: {
                    potential_yield: 0.6845,
                }
            }
        ];
        const specificGravity = 1.045;
        const volume = 25;
        const brewHouseEfficiency = 0.7;

        expect(getAmountOfMaltFromFermentables(fermentables, specificGravity, volume, brewHouseEfficiency)).toBeCloseTo(5604, 0);
    });

    it("should return the correct result (2)", () => {
        const fermentables = [
            {
                amount: 0.84,
                fermentable: {
                    potential_yield: 0.84,
                }
            },
            {
                amount: 0.16,
                fermentable: {
                    potential_yield: 0.782,
                }
            }
        ];
        const specificGravity = 1.042;
        const volume = 19;
        const brewHouseEfficiency = 0.8;

        expect(getAmountOfMaltFromFermentables(fermentables, specificGravity, volume, brewHouseEfficiency)).toBeCloseTo(3129, 0);
    });
});

