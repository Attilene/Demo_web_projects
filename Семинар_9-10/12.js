function task12(ancestry) {
    console.groupEnd();
    console.group(`TASK 12`);
    const history = {};
    ancestry.forEach(p => {
        const century = Math.ceil(p.died / 100);
        const [s, n] = history[century] ?? [0, 0];
        history[century] = [s + (p.died - p.born), n + 1];
    });
    console.table(history);
    Object.entries(history).forEach(([century, [s, n]]) => console.log(`${century}: ${(s / n).toFixed(1)}`));
}
fetch('ancestry.json').then(r => r.json()).then(task12);
//# sourceMappingURL=12.js.map