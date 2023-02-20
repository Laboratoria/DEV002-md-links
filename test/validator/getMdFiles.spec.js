const { getMdFiles } = require("../../validator");

const { mdArrayInternaFour, arrayStore, routEmpty } = require("./pathname");

describe("Everything related to the getMdFiles fuction", () => {
  it("should be a function", () => {
    expect(typeof getMdFiles).toEqual("function");
  });
  it("should return an array", () => {
    expect(getMdFiles(mdArrayInternaFour)).toEqual(arrayStore);
  });
  it("should return an empty array", () => {
    expect(getMdFiles(routEmpty)).toEqual([]);
  })
});
