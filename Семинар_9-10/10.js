console.groupEnd();
console.group(`TASK 10`);
function flatArray(arr) {
    return arr.reduce((acc, el) => [...acc, ...el]);
}
console.log(flatArray([[0, 1], [2, 3]]));
//# sourceMappingURL=10.js.map