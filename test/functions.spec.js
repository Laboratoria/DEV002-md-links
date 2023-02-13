const { existPath } = require("../functions.js");

describe("existPath", () => {
  it("Debe validar cuando el path existe", () => {
    existPath('Testing/PruebaconLinks.md');
    expect(existPath('Testing/PruebaconLinks.md')).toEqual(true);
  });
  it("Debe validar cuando el path no existe", () => {
    existPath("./laura/test1.md");
    expect(existPath("./laura/test1.md")).toEqual(false);
  });
});