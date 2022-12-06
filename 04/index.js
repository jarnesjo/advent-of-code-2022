const fs = require("fs")
const readline = require("readline")

;(async function () {
  const fileStream = fs.createReadStream(__dirname + "/data.txt")
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const pairs = []
  for await (const line of rl) {
    pairs.push(line.split(",").map((newPairs) => newPairs.split("-")))
  }

  function inRange(x, min, max) {
    return (x - min) * (x - max) <= 0
  }

  const result = pairs.filter((pair) => {
    const [min1, max1] = pair[0]
    const [min2, max2] = pair[1]

    return (
      (inRange(min1, min2, max2) && inRange(max1, min2, max2)) ||
      (inRange(min2, min1, max1) && inRange(max2, min1, max1))
    )
  })

  // Solution 1
  console.log(result.length)

  const result2 = pairs.filter((pair) => {
    const [min1, max1] = pair[0]
    const [min2, max2] = pair[1]

    return inRange(max1, min2, max2) || inRange(max2, min1, max1)
  })

  // Solution 2
  console.log(result2.length)
})()
