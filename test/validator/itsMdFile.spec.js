const { itsMdFile } = require("../../validator");

const { routTestOne, directoryFalse } = require("./pathname");

describe("Everything related to the itsMdFile fuction", () => {
  it("should be a function", () => {
    expect(typeof itsMdFile).toEqual("function");
  });
  it("should return true", () => {
    expect(itsMdFile(routTestOne)).toBe(true);
  });
  it("should return false", () => {
    expect(itsMdFile(directoryFalse)).toBe(false);
  });
});
