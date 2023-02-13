import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'


const format = (input: string): Letters[] => input.split(/\n/) as Letters[]

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;

type Letters = string & { readonly __brand: unique symbol };

type LettersSplited = Letters[]

const lettersPriority = characters
    .split('')
    .reduce((acc, l: string, i) => {
        acc[l as Letters] = i + 1
        return acc
    }, {} as Record<Letters, number>)

const midpoint = (input: Letters) => Math.floor(input.length / 2);


const divide = (input: Letters): LettersSplited => [input.slice(0, midpoint(input)) as Letters, input.slice(midpoint(input)) as Letters];


// this is a good tip AI gave me
// retrieve the first character shared between the
// way of characters (strings)
const commonChar = (strings: LettersSplited) => {
    return [...strings.reduce((set, str) => (
        new Set([...str].filter(char => set.has(char)))
    ), new Set(strings[0]))][0];
}

const parts = (ruckSacks: Letters[], div: number) => Array.from({ length: Math.ceil(ruckSacks.length / 3) }, (_, i) =>
    ruckSacks.slice(i * div, i * div + div)
);

const getSolution = (input: string, operation: string = 'divide'): number =>
    operation === 'divide' && format(input)
        .reduce((acc: number, ruckSack: string) =>
            acc + lettersPriority[
            commonChar(divide(ruckSack as Letters)) as Letters], 0) ||

    parts(format(input), 3).reduce((acc, ruckSacks: Letters[]) =>
        acc + lettersPriority[commonChar(ruckSacks) as Letters]
        , 0)


const solution_1 = (input: string) => getSolution(input, 'divide');
const solution_2 = (input: string) => getSolution(input, 'take-3')

export const getPrioritySumOfAllFailedRucksackItem = feed(readInput('day-3'), solution_1)
export const getPrioritySumOfAllGroupsBadges = feed(readInput('day-3'), solution_2)
