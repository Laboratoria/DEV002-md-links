const { validateRoute } = require("../../validator");

const { manyFiles } = require("./pathname");

describe("Everything related to the validateRoute fuction", () => {
  it("sould return a promise", () => {
    return validateRoute(manyFiles).then((data) => {
      expect(data).toBeInstanceOf(Array);
    });
  });
  it("if it returns an error", () => {
    const errorMessages = "ENOENT: no such file or directory, open 'C:\\Users\\Usuario\\Desktop\\DEV002-md-links\\file_noFound.md'"
    return expect(validateRoute("file_noFound.md")).rejects.toThrowError(errorMessages);
  });
});
