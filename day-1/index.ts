import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'


const formatAndGroupCalories = (input: string) => input.split(/\n\n/)
  .map((w) => w.replace(/\n(?=.*)/g, ','))
  .map((c: string) => c.split(',')
    .reduce((acc, calories: string) => acc + Number(calories), 0))



const solution_1 = (input: string) => {
  return Math.max(...formatAndGroupCalories(input))
}

const solution_2 = (input: string) => {
  return formatAndGroupCalories(input)
    .sort((a, b) => a > b ? -1 : 1)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)
}

export const getElfCarryingMostCalories = feed(readInput('day-1'), solution_1)
export const getTopThreeElfCarryingMostCalories = feed(readInput('day-1'), solution_2)



