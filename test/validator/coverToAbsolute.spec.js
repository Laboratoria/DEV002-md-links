const {
    converToAbsolute,
} = require("../../validator");

const routRelTwo = "test/files/interna_one/holaDos.md";

describe("the converToabsolute function test", () => {
    it("should be a function", () => {
      expect(typeof converToAbsolute).toEqual("function");
    });
    it("should return an path absolute", () => {
      expect(converToAbsolute(routRelTwo)).toContain("C:\\Users\\Usuario\\Desktop\\DEV002-md-links\\test\\files\\interna_one\\holaDos.md");
    });
  });