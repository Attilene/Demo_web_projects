console.groupEnd();
console.group(`TASK 6`);
function range(start, end, step = 1) {
    return Array.from(Array(Math.floor(Math.abs((end - start) / step)) + 1).keys())
        .map(el => (el * step) + start);
}
function sum(arr) {
    return arr.reduce((acc, el) => acc + el);
}
console.log(range(0, 10));
console.log(range(5, -2, 3));
console.log(sum([-1, 2, 3]));
//# sourceMappingURL=6.js.map