import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'


const format = (input: string): PossibleStrategies[] => input.split(/\n/)

const result_points = [0, 3, 6] as const

const choice_points = {
    X: 1,
    Y: 2,
    Z: 3,
} as const

const table = {
    X: 'C',
    Y: 'A',
    Z: 'B',
    C: 'Y',
    A: 'Z',
    B: 'X',
} as const

const my = ['X', 'Y', 'Z'] as const;
const their = ['A', 'B', 'C'] as const;

type MyPossibleChoices = typeof my[number]
type TheirPossibleChoices = typeof their[number]

type Args = {
    myChoice: MyPossibleChoices
    theirChoice: TheirPossibleChoices
};

// this is a nice type I discored talking to chatGPT
// is the result of an operation that builds
// all possible values of the combination of two union types
type PossibleStrategies = (Args & { string: string })['string'];

const getPoints = ({ myChoice, theirChoice }: Args) => getResult({ myChoice, theirChoice }) + choice_points[myChoice]

const getResult = ({ myChoice, theirChoice }: Args): typeof result_points[number] =>
    (table[myChoice] === theirChoice && 6) ||
    ((table[theirChoice] === myChoice && 0) === 0 ? 0 : 3);


const solution_1 = (input: string) => format(input).reduce((acc, choices: PossibleStrategies) => {
    const [theirChoice, myChoice] = choices.split(" ") as [TheirPossibleChoices, MyPossibleChoices]
    const points = getPoints({ myChoice, theirChoice })
    return acc + points
}, 0)


const solution_2 = (input: string) => {

}

export const countPoints = feed(readInput('day-2'), solution_1)
export const _ = feed(readInput('day-2'), solution_2)



