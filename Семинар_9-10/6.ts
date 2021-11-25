console.groupEnd()
console.group(`TASK 6`)

function range(start: number, end: number, step: number = 1): number[] {
    return Array.from(
        Array(Math.floor(
            Math.abs((end - start) / step)) + 1
        ).keys())
        .map(el => (el * step) + start)
}

function sum(arr: number[]): number {
    return arr.reduce((acc, el) => acc + el)
}

console.log(range(0, 10))

console.log(range(5, -2, 3))

console.log(sum([-1, 2, 3]))