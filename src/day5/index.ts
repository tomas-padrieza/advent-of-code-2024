import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const [ruleLines, pageLines] = input
    .split("\n\n")
    .map((lines) => lines.split("\n"))

  const ruleMap: { [key: string]: string[] } = {}
  const rules = ruleLines.map((line) => line.split("|"))

  rules.forEach((rule) => {
    ruleMap[rule[0]] = ruleMap[rule[0]]
      ? [...ruleMap[rule[0]], rule[1]]
      : [rule[1]]
  })

  const orderedRules = ruleLines
    .map((line) => line.split("|"))
    .flat()
    .filter((val, idx, arr) => arr.indexOf(val) === idx)
    .sort((a, b) => (ruleMap[a] && ruleMap[a].includes(b) ? -1 : 1))

  const orderedPages = pageLines
    .map((line) => line.split(","))
    .map((page) => {
      return page.sort((a, b) =>
        orderedRules.includes(a) && orderedRules.includes(b)
          ? orderedRules.indexOf(a) < orderedRules.indexOf(b)
            ? -1
            : 1
          : 0,
      )
    })
    .filter((line, idx) => line.join(",") === pageLines[idx])
    .reduce((acc, val) => acc + Number(val[(val.length - 1) / 2]), 0)

  return orderedPages
}

const goB = (input: string) => {
  return
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
