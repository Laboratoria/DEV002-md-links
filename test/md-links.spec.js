const { mdLink } = require("../index");
const { validateRoute } = require("../validator");

describe("mdLink", () => {
  it("without options it should return an array", () => {
    return mdLink("./README.md", []).then((data) => {
      expect(data).toBeInstanceOf(Array);
    });
  });
  it("if they enter both options", () => {
    return mdLink("./test/files/interna_one/interna_three/fileThree.md", ["--validate", "--stats"]).then((data) => {
      expect(data).toEqual({ totalFiles: 1, totalUnique: 1, broken: 0 });
    });
  });
  it("if the option it's --stats", () => {
    return mdLink("./test/files/interna_one/interna_three/fileThree.md", ["--stats"]).then((data) => {
      expect(data).toEqual({ totalFiles: 1, totalUnique: 1 });
    });
  });

  it("if the option it's --validate", () => {
    const path = "./test/files/interna_one/interna_three/fileThree.md";
    const options = ["--validate"];
    return mdLink(path, options).then((data) => {
      if (typeof data === "string") {
        validateRoute(data).then((data) => {
          expect(data).toBeInstanceOf(Array)
        });
      }
    });
  });

  it("should be a error", () => {
    let path = "http//c_falla";
    let errorMessage =
      "ENOENT: no such file or directory, stat 'http//c_falla'";
    let option = ["--validate"];
    return expect(mdLink(path, option)).rejects.toThrowError(errorMessage);
  });
});
 