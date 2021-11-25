console.groupEnd()
console.group(`TASK 8`)

interface ListNode<T = unknown> {
    value: T
    rest: ListNode<T> | null
}

function arrayToList<T>(arr: T[]): ListNode<T> {
    return arr.slice().reverse().reduce(
        (rest, value) => ({ rest, value }),
        null as ListNode<T>
    )
}

function listToArray<T>(list: ListNode<T>): T[] {
    function trans({ rest, value }: ListNode<T>, arr: T[]): T[] {
        arr = [...arr, value]
        return rest
            ? trans(rest, arr)
            : arr
    }

    return trans(list, [])
}

function prepend<T>(value: T, rest: ListNode<T>): ListNode<T> {
    return { rest, value }
}

function nth<T>(list: ListNode<T>, index: number): T | undefined {
    function find({ rest, value }: ListNode<T>, pos: number): T | undefined {
        return pos == index
            ? value
            : rest
                ? find(rest, pos + 1)
                : undefined
    }

    return find(list, 0)
}

const b = [0, 1, 2, 3]

console.log(arrayToList(b))

console.log(listToArray(arrayToList(b)))

console.log(prepend(-1, arrayToList(b)))

console.log(nth(arrayToList(b), 3))