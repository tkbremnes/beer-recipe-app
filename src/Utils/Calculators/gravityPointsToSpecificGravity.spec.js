import gravityPointsToSpecificGravity from "./gravityPointsToSpecificGravity";

describe("gravityPointsToSpecificGravity", () => {
    it("should calculate gravity points (1)", () => {
        const expected = 1.042;

        const actual = gravityPointsToSpecificGravity(42);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (2)", () => {
        const expected = 1.056;

        const actual = gravityPointsToSpecificGravity(56);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (3)", () => {
        const expected = 1.070;

        const actual = gravityPointsToSpecificGravity(70);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (4)", () => {
        const expected = 1.010;

        const actual = gravityPointsToSpecificGravity(10);

        expect(actual).toEqual(expected);
    });
});
