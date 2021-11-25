console.groupEnd()
console.group(`TASK 2`)

Array.from(Array(100).keys())
    .map(el => {
        if (el % 15 == 0) return "FizzBuzz"
        else if (el % 3 == 0) return "Fizz"
        else if (el % 5 == 0) return "Buzz"
        else return el
    }).forEach(el => console.log(el))