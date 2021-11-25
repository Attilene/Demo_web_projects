console.groupEnd()
console.group(`TASK 10`)

function flatArray<T>(arr: T[][]): T[] {
    return arr.reduce((acc, el) => [...acc, ...el])
}

console.log(flatArray([[0, 1], [2, 3]]))