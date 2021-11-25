console.groupEnd();
console.group(`TASK 9`);
function deepEqual(obj1, obj2) {
    function equal(o1, o2) {
        if (typeof o1 !== typeof o2)
            return false;
        if (o1 instanceof Array) {
            if (!(o2 instanceof Array))
                return false;
            if (o1.length != o2.length)
                return false;
            return o1.every((el, i) => equal(el, o2[i]));
        }
        if (o1 instanceof Object) {
            if (!(o2 instanceof Object))
                return false;
            if (Object.keys(o1).length != Object.keys(o2).length)
                return false;
            return Object.keys(o1).every(k => equal(o1[k], o2[k]));
        }
        return o1 === o2;
    }
    return equal(obj1, obj2);
}
console.log(deepEqual({ a: 0, b: [0, 1] }, { a: 0, b: [0, 1] }));
console.log(deepEqual([0, 1], [0]));
//# sourceMappingURL=9.js.map