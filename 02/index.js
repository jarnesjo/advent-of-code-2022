const fs = require("fs")
const readline = require("readline")

;(async function () {
  const gameValue = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    Y: "Paper",
    X: "Rock",
    Z: "Scissors",
  }

  const movePoints = {
    Scissors: 3,
    Rock: 1,
    Paper: 2,
  }

  const outComeValues = {
    win: 6,
    draw: 3,
    lose: 0,
  }

  const fileStream = fs.createReadStream(__dirname + "/data.txt")
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const gameData = []
  for await (const line of rl) {
    gameData.push(line)
  }

  // Solution 1
  const gameSum = gameData.map((game) => {
    const values = game.split(" ")

    const elfMove = gameValue[values[0]]
    const myMove = gameValue[values[1]]

    if (elfMove === myMove) return movePoints[myMove] + outComeValues.draw

    if (elfMove === "Scissors") {
      if (myMove === "Paper") return movePoints[myMove] + outComeValues.lose
      if (myMove === "Rock") return movePoints[myMove] + outComeValues.win
    }

    if (elfMove === "Rock") {
      if (myMove === "Paper") return movePoints[myMove] + outComeValues.win
      if (myMove === "Scissors") return movePoints[myMove] + outComeValues.lose
    }

    if (elfMove === "Paper") {
      if (myMove === "Scissors") return movePoints[myMove] + outComeValues.win
      if (myMove === "Rock") return movePoints[myMove] + outComeValues.lose
    }
  })
  console.log(gameSum.reduce((a, b) => a + b, 0))

  // Solution 2
  const game2sum = gameData.map((game) => {
    const values = game.split(" ")

    const elfMove = gameValue[values[0]]

    const outCome = {
      X: "lose",
      Y: "draw",
      Z: "win",
    }

    if (outCome[values[1]] === "win") {
      if (elfMove === "Scissors") return movePoints.Rock + outComeValues.win
      if (elfMove === "Rock") return movePoints.Paper + outComeValues.win
      if (elfMove === "Paper") return movePoints.Scissors + outComeValues.win
    }

    if (outCome[values[1]] === "draw") {
      if (elfMove === "Scissors") return movePoints.Scissors + outComeValues.draw
      if (elfMove === "Rock") return movePoints.Rock + outComeValues.draw
      if (elfMove === "Paper") return movePoints.Paper + outComeValues.draw
    }

    if (outCome[values[1]] === "lose") {
      if (elfMove === "Scissors") return movePoints.Paper + outComeValues.lose
      if (elfMove === "Rock") return movePoints.Scissors + outComeValues.lose
      if (elfMove === "Paper") return movePoints.Rock + outComeValues.lose
    }
  })
  console.log(game2sum.reduce((a, b) => a + b, 0))
})()
