const { getAllMdFiles } = require("../../validator");

const { directoryS } = require("./pathname");

describe("everything related to the getAllMdFiles function", () => {
  it("should be a function ", () => {
    expect(typeof getAllMdFiles).toBe("function");
  });
  it("should return files md", () => {
    const arrayOfFiles = getAllMdFiles(directoryS);
    expect(arrayOfFiles).toBeInstanceOf(Array);
  });
});
