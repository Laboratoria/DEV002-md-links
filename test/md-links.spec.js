const { mdLinks } = require("../mdLinks.js");

const ruta = "../mdtests"
const part1 = "./mdtests/part1.md"
const part4 = "./mdtests/parte2/parte3/part4.md"
const brokenPath = "!mdtests.md"

describe("mdLinks ", () => {

  it("should reject the function", () => {
    mdLinks(brokenPath, []).then().catch((err) =>{
      expect(err).toEqual("INVALID PATH")
    })
  })

  it("should get links", () => {
    mdLinks(part1, []).then((links)=>{
      expect(links.length).not.toBe(0)
    })
  })

});