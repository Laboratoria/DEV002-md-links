const { readFolder
} = require("../../validator");

const { readFiles
} = require("./pathname");


describe("Everything related to the readFolder fuction", () => {
    it("should be a function", () => {
        expect(typeof readFolder).toEqual("function");
    });
    it("should return an array", () => {
        expect(readFolder(readFiles)).toContain("file_two.2.md")
    });
});