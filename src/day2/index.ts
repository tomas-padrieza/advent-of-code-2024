import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const lines = input.split("\n").filter((line) => line !== "")

  const safe = lines.reduce((acc, line) => {
    const levels = line.split(/\s/).map(Number)

    const slices = []
    for (let i = 0; i < levels.length - 1; i++) {
      slices.push(levels.slice(i, i + 2))
    }

    const diffs = slices.map((slice) => slice[1] - slice[0])

    if (
      Math.max(...diffs) > 3 ||
      Math.min(...diffs) < -3 ||
      diffs.includes(0) ||
      (Math.max(...diffs) > 0 && Math.min(...diffs) < 0)
    )
      return acc

    return acc + 1
  }, 0)

  return safe
}

const goB = (input: string) => {
  const lines = input.split("\n").filter((line) => line !== "")

  const sets = []
  lines.forEach((line, idx) => {
    const levels = line.split(/\s/).map(Number)
    const levelSets = [levels]

    for (let i = 0; i < levels.length; i++) {
      const set = [...levels]
      set.splice(i, 1)
      levelSets.push(set)
    }

    sets.push(levelSets)
  })

  const safe = sets.reduce((acc, levelSets) => {
    const levelSafe = levelSets.reduce((acc, level) => {
      const slices = []
      for (let i = 0; i < level.length - 1; i++) {
        slices.push(level.slice(i, i + 2))
      }

      const diffs = slices.map((slice) => slice[1] - slice[0])
      if (
        Math.max(...diffs) > 3 ||
        Math.min(...diffs) < -3 ||
        diffs.includes(0) ||
        (Math.max(...diffs) > 0 && Math.min(...diffs) < 0)
      )
        return acc

      return acc + 1
    }, 0)

    return levelSafe > 0 ? acc + 1 : acc
  }, 0)

  return safe
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
