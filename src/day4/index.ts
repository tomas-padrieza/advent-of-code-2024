import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const lines = input.split("\n")
  const letterMatrix = lines.map((l) => l.split(""))
  const boundaryX = letterMatrix[0].length - 1
  const boundaryY = letterMatrix.length - 1
  const words = []
  lines.forEach((line, lineIdx) => {
    const starts = [...line.matchAll(/X/g)].map((x) => x.index)

    starts.forEach((start) => {
      for (let y = -3; y < 4; y += 3) {
        for (let x = -3; x < 4; x += 3) {
          if (x !== 0 || y !== 0) {
            if (
              lineIdx + y >= 0 &&
              lineIdx + y <= boundaryY &&
              start + x >= 0 &&
              start + x <= boundaryX
            ) {
              const word = []
              for (let i = 0; i < 4; i++) {
                const letterPosX =
                  x === 0 ? start : x > 0 ? start + i : start - i
                const letterPosY =
                  y === 0 ? lineIdx : y > 0 ? lineIdx + i : lineIdx - i
                word.push(letterMatrix[letterPosY][letterPosX])
              }

              words.push(word.join(""))
            }
          }
        }
      }
    })
  })

  return words.filter((word) => word === "XMAS").length
}

const goB = (input: string) => {
  const lines = input.split("\n")
  const letterMatrix = lines.map((l) => l.split(""))
  const boundaryX = letterMatrix[0].length - 1
  const boundaryY = letterMatrix.length - 1

  let count = 0
  lines.forEach((line, lineIdx) => {
    const starts = [...line.matchAll(/A/g)].map((x) => x.index)

    starts.forEach((start) => {
      if (
        lineIdx - 1 >= 0 &&
        lineIdx + 1 <= boundaryY &&
        start - 1 >= 0 &&
        start + 1 <= boundaryX
      ) {
        const lr =
          letterMatrix[lineIdx - 1][start - 1] +
          letterMatrix[lineIdx + 1][start + 1]
        const rl =
          letterMatrix[lineIdx - 1][start + 1] +
          letterMatrix[lineIdx + 1][start - 1]

        if ((lr === "MS" || lr === "SM") && (rl === "MS" || rl === "SM")) {
          count++
        }
      }
    })
  })

  return count
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
