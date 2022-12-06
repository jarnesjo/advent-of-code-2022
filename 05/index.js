const fs = require("fs")
const readline = require("readline")

;(async function () {
  const fileStream = fs.createReadStream(__dirname + "/data.txt")
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const crates = [
    ["L", "N", "W", "T", "D"],
    ["C", "P", "H"],
    ["W", "P", "H", "N", "D", "G", "M", "J"],
    ["C", "W", "S", "N", "T", "Q", "L"],
    ["P", "H", "C", "N"],
    ["T", "H", "N", "D", "M", "W", "Q", "B"],
    ["M", "B", "R", "J", "G", "S", "L"],
    ["Z", "N", "W", "G", "V", "B", "R", "T"],
    ["W", "G", "D", "N", "P", "L"],
  ]

  for await (const line of rl) {
    const [quantity, from, to] = line.match(/(\d+)/g)

    const fromCrate = crates[from - 1]
    const toCrate = crates[to - 1]

    const containers = fromCrate.slice(fromCrate.length - quantity)
    const newFromCrate = fromCrate.slice(0, fromCrate.length - quantity)

    // Comment this out for Solution 2
    if (quantity > 1) containers.reverse()

    toCrate.push(...containers)

    crates[from - 1] = newFromCrate
    crates[to - 1] = toCrate
  }

  // Answer
  console.log(crates.map((crate) => crate.pop()).join(""))
})()
