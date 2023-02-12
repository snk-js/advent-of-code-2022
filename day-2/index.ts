import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'


const format = (input: string): PossibleStrategies[] => input.split(/\n/)

const result_points = [0, 3, 6] as const

const choice_points = {
    X: 1,
    Y: 2,
    Z: 3,
} as const

const winner = {
    X: 'C',
    Y: 'A',
    Z: 'B',
    C: 'Y',
    A: 'Z',
    B: 'X',
} as const

type AllPossibleChoicesFromKeys = keyof typeof winner
type AllPossibleChoicesFromValues = typeof winner[AllPossibleChoicesFromKeys]
type Losers = Record<AllPossibleChoicesFromValues, AllPossibleChoicesFromKeys>;
const reducerObj = {} as Losers;

const losers = Object.entries(winner).reduce((acc, [key, value]) => {
    acc[value as AllPossibleChoicesFromValues] = key as AllPossibleChoicesFromKeys;
    return acc;
}, reducerObj);

const my = ['X', 'Y', 'Z'] as const;
const their = ['A', 'B', 'C'] as const;

type MyPossibleChoices = typeof my[number]
type TheirPossibleChoices = typeof their[number]

type Args = {
    myChoice: MyPossibleChoices
    theirChoice: TheirPossibleChoices
};

type Choices = [TheirPossibleChoices, MyPossibleChoices]

// this is a nice type I discored talking to chatGPT
// is the result of an operation that builds
// all possible values of the combination of two union types
type PossibleStrategies = (Args & { string: string })['string'];

const getPoints =
    ({ myChoice, theirChoice }: Args) =>
        getResult({ myChoice, theirChoice }) + choice_points[myChoice]


const reduce = (input: string, convert: boolean) => {
    return format(input).reduce((acc, choices: PossibleStrategies) => {
        const [theirChoice, myChoice] = choices.split(" ") as Choices
        const points = getPoints({ theirChoice, myChoice: convert ? changeStrategy({ myChoice, theirChoice }) : myChoice })
        return acc + points
    }, 0)
}



const getResult = ({ myChoice, theirChoice }: Args): typeof result_points[number] =>
    (winner[myChoice] === theirChoice && 6) ||
    ((winner[theirChoice] === myChoice && 0) === 0 ? 0 : 3);
const getSolution = (input: string, convert: boolean = false) =>
    reduce(input, convert)


// strategy adopted to solve solution 2
const changeStrategy = ({ myChoice, theirChoice }: Args): MyPossibleChoices => {
    if (myChoice === 'X') return winner[theirChoice];
    if (myChoice === 'Z') return losers[theirChoice] as MyPossibleChoices;
    return my[their.indexOf(theirChoice)];
}

const solution_1 = (input: string) => getSolution(input);
const solution_2 = (input: string) => getSolution(input, true)

export const countPoints = feed(readInput('day-2'), solution_1)
export const countPointsSecondStrategy = feed(readInput('day-2'), solution_2)
