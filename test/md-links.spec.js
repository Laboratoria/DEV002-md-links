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

  it("should get path + links", () => {
    mdLinks(part1, []).then((links)=>{
      const flatlinks = links.flat()
      expect(flatlinks[0]).not.toBe(null)
    })
  })
<
  // flatlinks:
  // [
  //   {
  //     file: './mdtests/part1.md',
  //     link: 'https://es.wikipedia.org/wiki/Markdown'
  //   }
  // ]

  it("Should get valid (isValid: true) links", () => {
    const argumentos = ["--validate"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links[0].isValid).toBe(true)
    })
  })

  // links
  // [
  //   {
  //     link: {
  //       file: './mdtests/part1.md',
  //       link: 'https://es.wikipedia.org/wiki/Markdown'
  //     },
  //     isValid: false
  //   }
  // ]

  it("Should get number of total links", () => {
    const argumentos = ["--stats"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links.totalLinks).toBe(1)
    })
  })

  it("Should get number of total links, valid links and broken links", () => {
    const argumentos = ["--stats", "--validate"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links.totalLinks).toBe(1)
      expect(links.validLinks).toBe(1)
      expect(links.brokenLinks).toBe(0)
    })
  })

})

/* const argumentos = ["--validate"] */