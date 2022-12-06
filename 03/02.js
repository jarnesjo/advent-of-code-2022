const fs = require("fs")
const readline = require("readline")

Array.prototype.findCommonWord = function () {
  let tempArray = this.map(function (item) {
    return [...new Set(item.split(""))].join("")
  }).sort(function (a, b) {
    return a.length - b.length
  })

  let count = 0
  let firstElm = tempArray[0].split("")
  let restElem = tempArray.splice(1)
  let countObject = {}

  for (let i = 0; i < firstElm.length; i++) {
    let z = findIfIncludes(restElem, firstElm[i])
    if (z.length === restElem.length) {
      countObject[firstElm[i]] = 1
    } else {
      countObject[firstElm[i]] = 0
    }
  }

  function findIfIncludes(arr, char) {
    return arr.filter((item) => item.includes(char))
  }
  // console.log(countObject)
  // return countObject

  let totalCount = 0
  for (let keys in countObject) {
    if (countObject[keys] > 0) {
      // totalCount += 1
      return keys
    }
  }
  return totalCount
}
;(async function () {
  const fileStream = fs.createReadStream(__dirname + "/data.txt")
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const alphabeth = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const threeparts = []
  let temp = []
  let count = 0
  for await (const newLine of rl) {
    count++
    temp.push(newLine)

    if (count % 3 === 0) {
      threeparts.push(temp)
      temp = []
    }
  }

  const threepartsResults = threeparts
    .map((items) => {
      const char = items.findCommonWord()
      return alphabeth.indexOf(char) + 1
    })
    .reduce((a, b) => a + b, 0)

  // Solution 2
  console.log(threepartsResults)
})()
