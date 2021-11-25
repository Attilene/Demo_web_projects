console.groupEnd();
console.group(`TASK 8`);
function arrayToList(arr) {
    return arr.slice().reverse().reduce((rest, value) => ({ rest, value }), null);
}
function listToArray(list) {
    function trans({ rest, value }, arr) {
        arr = [...arr, value];
        return rest
            ? trans(rest, arr)
            : arr;
    }
    return trans(list, []);
}
function prepend(value, rest) {
    return { rest, value };
}
function nth(list, index) {
    function find({ rest, value }, pos) {
        return pos == index
            ? value
            : rest
                ? find(rest, pos + 1)
                : undefined;
    }
    return find(list, 0);
}
const b = [0, 1, 2, 3];
console.log(arrayToList(b));
console.log(listToArray(arrayToList(b)));
console.log(prepend(-1, arrayToList(b)));
console.log(nth(arrayToList(b), 3));
//# sourceMappingURL=8.js.map