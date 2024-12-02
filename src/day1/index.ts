import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const [list1, list2] = [[], []]

  const lines = input.split("\n").filter((line) => line !== "")

  lines.forEach((line) => {
    const [entry1, entry2] = line.split(/\s+/)
    list1.push(Number(entry1))
    list2.push(Number(entry2))
  })

  list1.sort()
  list2.sort()

  const divs = list1.map((val, idx) => Math.abs(val - list2[idx]))
  const total = divs.reduce((prev, curr) => prev + curr, 0)

  return total
}

const goB = (input: string) => {
  const [list1, list2] = [{}, {}]

  const lines = input.split("\n").filter((line) => line !== "")

  lines.forEach((line) => {
    const [entry1, entry2] = line.split(/\s+/)
    list1[entry1] = list1[entry1] ? list1[entry1] + 1 : 1
    list2[entry2] = list2[entry2] ? list2[entry2] + 1 : 1
  })

  const total = Object.keys(list1).reduce((acc, val) => {
    return acc + Number(val) * list1[val] * (list2[val] || 0)
  }, 0)

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
