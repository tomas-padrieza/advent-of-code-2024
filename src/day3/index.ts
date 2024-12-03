import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const multis = [...input.matchAll(/mul\([\d]{1,3},[\d]{1,3}\)/g)]
    .map((m) => [[...m[0].matchAll(/\d+/g)].map((dig) => Number(dig[0]))])
    .flat()
    .reduce((acc, curr) => acc + curr[0] * curr[1], 0)

  return multis
}

const goB = (input: string) => {
  const doesAndDonts = [...input.matchAll(/(do\(\))|(don't\(\))/g)].map((m) => [
    m[0],
    m.index,
  ])

  let currIndex = 0
  let lastValid = true
  const validSnips = []
  doesAndDonts.forEach((part, idx) => {
    if (part[0] === "don't()") {
      if (lastValid) {
        validSnips.push([currIndex, Number(part[1])])
      }
      lastValid = false
    } else {
      if (!lastValid) {
        currIndex = Number(part[1])
      }
      if (idx === doesAndDonts.length - 1) {
        validSnips.push([currIndex, input.length])
      }
      lastValid = true
    }
  })

  const total = validSnips
    .map((snip) => {
      const multis = [
        ...input
          .slice(snip[0], snip[1])
          .matchAll(/mul\([\d]{1,3},[\d]{1,3}\)/g),
      ]
        .map((m) => [[...m[0].matchAll(/\d+/g)].map((dig) => Number(dig[0]))])
        .flat()
        .reduce((acc, curr) => acc + curr[0] * curr[1], 0)

      return multis
    })
    .reduce((acc, curr) => acc + curr, 0)

  return total
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
