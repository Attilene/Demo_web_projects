console.groupEnd();
console.group(`TASK 7`);
function reverseArray(arr) {
    return arr.map((el, i) => arr[arr.length - i - 1]);
}
function reverseArrayInPlace(arr) {
    return arr.slice(0, Math.floor(arr.length / 2))
        .forEach((el, i) => {
        const ri = arr.length - i - 1;
        arr[i] = arr[ri];
        arr[ri] = el;
    });
}
const a = [1, 2, 3, 4, 5];
console.log(reverseArray(a));
console.log(a);
reverseArrayInPlace(a);
console.log(a);
//# sourceMappingURL=7.js.map