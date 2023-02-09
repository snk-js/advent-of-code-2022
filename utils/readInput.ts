import fs from 'fs'

interface FormatFunctions {
    [key: string]: (input: any) => any;
}
type PreProcessor = keyof FormatFunctions;
type FunctionType = FormatFunctions[PreProcessor];
type FunctionArray = FunctionType[];

export const readInput = (day: string, preProcessors: FunctionArray = []) => {
    const result = fs.readFileSync(`${day}/input.txt`, { encoding: 'utf8', flag: 'r' })
    if (preProcessors.length) {
        return preProcessors.reduce((acc, p) => p(acc), result)
    }

    return result
}   