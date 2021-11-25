console.groupEnd()
console.group(`TASK 3`)

Array.from(Array(8).keys())
    .map(el => (el % 2 == 0 ? '# ' : ' #').repeat(4))
    .forEach(el => console.log(el))