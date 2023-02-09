import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'
import { split_new_lines } from '../utils/format'


const solution = (input: string) => {
  console.log('ok')
  console.log({ input })
}


export const getElfCarryingMostCalories = feed(readInput('day-1', [split_new_lines]), solution)



