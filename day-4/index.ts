import { readInput } from '../utils/readInput'
import { feed } from '../utils/feed'

const format = (input: string): InputLine[] => input.split(/\n/) as InputLine[]

type IntegerIntervals = [number, number, number, number]
type OneOrTwoDigits = `${1 | 2}${string}`;
type SectionAssigment = `${OneOrTwoDigits}-${OneOrTwoDigits}`
type InputLine = `${SectionAssigment},${SectionAssigment}`;
// Matches strings with 1 or 2 digits
// Matches strings with two comma-separated oneOrTwoDigits

const splitSectionIntervals = (input: InputLine) => input.split(',') as SectionAssigment[]

const splitSection = (input: SectionAssigment[]) => input.map(section => section.split('-'))
    .flatMap(interval => interval.map(digit => Number(digit as OneOrTwoDigits) as number)) as IntegerIntervals

const getIntervalIntegers = (line: InputLine): IntegerIntervals =>
    splitSection(splitSectionIntervals(line as InputLine) as SectionAssigment[])

const compareIntervals = (integerIntervals: IntegerIntervals, fullOverlap: boolean): boolean => {
    const [from1, to1, from2, to2] = integerIntervals
    const fullOverlapAssertion = ((from1 >= from2) && (to1 <= to2) ||
        (from2 >= from1) && (to2 <= to1))
    const weakOverlapAssertion = ((from2 <= to1) && (to2 >= to1) ||
        (to2 >= from1) && (from2 <= from1))

    if (fullOverlap) {
        return fullOverlapAssertion
    } else {
        return (fullOverlapAssertion || weakOverlapAssertion)
    }
}

const isPairOverlapped = (input: InputLine, fullyOverlap: boolean): boolean =>
    compareIntervals(getIntervalIntegers(input as InputLine), fullyOverlap)

const getSolution = (lines: InputLine[], fullyOverlap: boolean) => {
    let result = 0
    while (lines.length) {
        result += +isPairOverlapped(lines.pop() as InputLine, fullyOverlap)
    }
    return result
}

const solution_1 = (input: string) => getSolution(format(input), true);
const solution_2 = (input: string) => getSolution(format(input), false)

export const countFullyOverlappedSections = feed(readInput('day-4'), solution_1)
export const countOverlapsSections = feed(readInput('day-4'), solution_2)
