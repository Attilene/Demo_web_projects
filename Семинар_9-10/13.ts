console.groupEnd()
console.group(`TASK 13`)

type Checker<T> = (item: T, i: number, arr: T[]) => boolean

function some<T>(arr: T[], fn: Checker<T>): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i, arr)) return true
    }
    return false
}

function every<T>(arr: T[], fn: Checker<T>): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (!fn(arr[i], i, arr)) return false
    }
    return true
}

console.log(some([0, 1, 0], el => el == 1))
console.log(some([0, 0, 0], el => el == 1))

console.log(every([0, 0, 0], el => el == 0))
console.log(every([0, 1, 0], el => el == 0))