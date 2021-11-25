interface Person {
    name: string
    sex: 'm' | 'f'
    born: number
    died: number
    father?: string
    mother?: string
}

function task11(ancestry: Person[]) {
    console.groupEnd()
    console.group(`TASK 11`)

    const tree = Object.fromEntries(ancestry.map((p: Person) => [p.name, p])) as Record<string, Person>

    const [s, n] = Object.values(tree)
        .filter(({mother: m}) => m && tree[m])
        .reduce(
            ([s, n], {mother: m, born: b}) =>
                m && tree[m]
                    ? [s + (b - tree[m].born), n + 1]
                    : [s, n],
            [0, 0]
        )

    console.table(tree)
    console.log((s / n).toFixed(1))
}

fetch('ancestry.json').then(r => r.json()).then(task11)

