function task11(ancestry) {
    console.groupEnd();
    console.group(`TASK 11`);
    const tree = Object.fromEntries(ancestry.map((p) => [p.name, p]));
    const [s, n] = Object.values(tree)
        .filter(({ mother: m }) => m && tree[m])
        .reduce(([s, n], { mother: m, born: b }) => m && tree[m]
        ? [s + (b - tree[m].born), n + 1]
        : [s, n], [0, 0]);
    console.table(tree);
    console.log((s / n).toFixed(1));
}
fetch('ancestry.json').then(r => r.json()).then(task11);
//# sourceMappingURL=11.js.map