const { funcReadFiles } = require("../../validator");

const { routTestTwo, routEmpty } = require("./pathname");

describe("Everything related to the funcReadFiles fuction", () => {
  it("should be a function", () => {
    expect(typeof funcReadFiles).toEqual("function");
  });
  it("should read the file", () => {
    funcReadFiles(routTestTwo).then((data) => {
      expect(data).toEqual("# hello world");
    });
  });
  it("should throw an error", () => {
      expect(funcReadFiles(routEmpty)).rejects.toThrowError("EISDIR: illegal operation on a directory, read")
    });
});
