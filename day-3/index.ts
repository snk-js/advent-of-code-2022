import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'


const format = (input: string) => input.split(/\n/)

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;

type Letters = string & { readonly __brand: unique symbol };

type LettersSplited = [Letters, Letters]

const lettersPriority = characters
    .split('')
    .reduce((acc, l: string, i) => {
        acc[l as Letters] = i + 1
        return acc
    }, {} as Record<Letters, number>)

const midpoint = (input: Letters) => Math.floor(input.length / 2);

const divide = (input: Letters): LettersSplited => [input.slice(0, midpoint(input)) as Letters, input.slice(midpoint(input)) as Letters];

const commonChar = ([left, right]: LettersSplited) =>
    Array.from(new Set(left.split('')
        .filter(char =>
            right
                .split('')
                .includes(char))))[0];


const getSolution = (input: string): number => format(input).reduce((acc: number, ruckSacks: string) =>
    acc + lettersPriority[commonChar(divide(ruckSacks as Letters)) as Letters], 0)


const solution_1 = (input: string) => getSolution(input);
// const solution_2 = (input: string) => getSolution(input, true)

export const getPrioritySumOfAllFailedRucksackItem = feed(readInput('day-3'), solution_1)
// export const countPointsSecondStrategy = feed(readInput('day-2'), solution_2)
