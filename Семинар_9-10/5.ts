console.groupEnd()
console.group(`TASK 5`)

function countBs(s: string): number {
    return Array.from(s).filter(el => el === 'B').length
}

function count(s: string, c: string): number {
    return Array.from(s.matchAll(new RegExp(c, 'g'))).length
}

console.log(countBs('.B...B..'))

console.log(count('...0...1...0..', '0'))