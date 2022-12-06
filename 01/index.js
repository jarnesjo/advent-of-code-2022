const fs = require("fs")
const readline = require("readline")

;(async function () {
  const fileStream = fs.createReadStream(__dirname + "/data.txt")
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let sum = 0
  const elfData = []
  for await (const line of rl) {
    if (line === "") {
      elfData.push(sum)
      sum = 0
      continue
    }

    sum += parseInt(line)
  }

  // Solution 1
  console.log(elfData.reduce((a, b) => Math.max(a, b)))

  // Solution 2
  const sorted = elfData.sort((a, b) => b - a)
  console.log(sorted.splice(0, 3).reduce((a, b) => a + b, 0))
})()
