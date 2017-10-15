import specificGravityToGravityPoints from "./specificGravityToGravityPoints";

describe("specificGravityToGravityPoints", () => {
    it("should calculate gravity points (1)", () => {
        const expected = 42;

        const actual = specificGravityToGravityPoints(1.042);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (2)", () => {
        const expected = 56;

        const actual = specificGravityToGravityPoints(1.056);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (3)", () => {
        const expected = 70;

        const actual = specificGravityToGravityPoints(1.070);

        expect(actual).toEqual(expected);
    });

    it("should calculate gravity points (4)", () => {
        const expected = 10;

        const actual = specificGravityToGravityPoints(1.010);

        expect(actual).toEqual(expected);
    });
});
