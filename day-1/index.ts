import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'

const solution = (input: string) => {
  return Math.max(...input.split(/\n\n/)
    .map((w) => w.replace(/\n(?=.*)/g, ','))
    .map((c: string) => c.split(',')
      .reduce((acc, calories: string) => acc + Number(calories), 0)))
}

export const getElfCarryingMostCalories = feed(readInput('day-1'), solution)



