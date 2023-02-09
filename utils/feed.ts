

export const feed = (input: unknown, func: Function) => {
    return () => func(input)
}