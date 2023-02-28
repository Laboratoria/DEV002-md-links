const { mdLink } = require("../index");
const { validateRoute } = require("../validator");

describe("mdLink", () => {
  jest.setTimeout(25000);
  it("without options it should return an array", () => {
    return mdLink("./README.md", []).then((data) => {
      expect(data).toBeInstanceOf(Array);
    });
  });
  it("if they enter both options", () => {
    return mdLink("./README.md", ["--validate", "--stats"]).then((data) => {
      expect(data).toEqual({ totalFiles: 18, totalUnique: 17, broken: 0 });
    });
  });
  it("if the option it's --stats", () => {
    return mdLink("./README.md", ["--stats"]).then((data) => {
      expect(data).toEqual({ totalFiles: 18, totalUnique: 17 });
    });
  });

  it("if the option it's --validate", () => {
    const path = "./README.md";
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
 