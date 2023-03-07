import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'

type Chars = string & { readonly __brand: unique symbol };
type Crate = `[${Chars}] ` | '    ';

const crateRegex = /^\s*\[[A-Z]+\]\s*$/;

const format = (input: string) => input.split(/\n\n/)

const createStructuredInput = ([crates, moves]: string[]): [Stacks, number[][]] => {
    const cranes = crates.split(/\n/)
    const allMoves = moves.split(/\n/)
    const stackLabels = cranes.pop();
    const stackLength = Number(stackLabels?.split('   ').pop()) - 1
    const segmentRegex = /.{1,4}/g
    const preFormatedCrates = []
    const formatedCrates: Crate[][] = []
    const formatedMoves: number[][] = []

    for (let i = 0; i <= cranes.length; i++) {
        preFormatedCrates.push(cranes[cranes.length - i]?.match(segmentRegex) || [] as any[])
    }

    for (let i = 0; i <= stackLength; i++) {
        for (let j = 0; j <= stackLength; j++) {
            !formatedCrates[i] && (formatedCrates[i] = []);
            crateRegex.test(preFormatedCrates[j][i]) && formatedCrates[i].push(preFormatedCrates[j][i])
        }
    }

    const extractValues = /^move\s+([^ ]+)\s+from\s+([^ ]+)\s+to\s+([^ ]+)$/;

    for (let i = 0; i <= allMoves.length - 1; i++) {
        const [_, x, y, z] = allMoves[i].match(extractValues) || '';
        formatedMoves.push([Number(x), Number(y) - 1, Number(z) - 1])
    }

    return [formatedCrates, formatedMoves]
}

const processMoves = (n: number, from: Crate[], to: Crate[]): void => {
    if (n === 0) return
    to.push(from.pop() || '    ')
    return processMoves(n - 1, from, to)
}

type Stacks = Crate[][]


const processAllMoves = (crates: Crate[][], moves: number[][]): Stacks => {
    if (!moves.length) return crates
    const [n, from, to] = moves.shift() || []
    const fromStack = crates[from]
    const toStack = crates[to]
    processMoves(n, fromStack, toStack)
    return processAllMoves(crates, moves)
}


const getSolution = (input: string[]) => {
    const [crates, moves] = createStructuredInput(input)
    return processAllMoves(crates, moves).map(stack => (stack.pop())).toString().match(/[a-zA-Z]/g)?.join('')
}

const solution_1 = (input: string) => getSolution(format(input));
// const solution_2 = (input: string) => getSolution(format(input))

export const cratedAfterAllMoved = feed(readInput('day-5'), solution_1)
// export const countOverlapsSections = feed(readInput('day-5'), solution_2)
