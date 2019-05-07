import { formatNumberSuffix } from "./common";
describe("common utils", () => {
  describe("suffic number", () => {
    it("should leave single digit untouched", () => {
      expect(formatNumberSuffix(1)).toBe("1");
    });
    it("should format 1500 to 1.5k", () => {
      expect(formatNumberSuffix(1500)).toBe("1.5k");
    });
    it("should format 10.000 to 10k", () => {
      expect(formatNumberSuffix(10000)).toBe("10k");
    });
    it("should throw when number is negative", () => {
      expect(() => formatNumberSuffix(-100)).toThrow();
    });
  });
});
