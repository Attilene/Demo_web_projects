function appendCell(row, value) {
    row.insertCell().innerText = String(value);
}
function appendRow(section, values) {
    const row = section.insertRow();
    values.forEach(v => appendCell(row, v));
}
function sortTable(body, column) {
    const sort = !isNaN(Number(body.rows[0].cells[column].innerText))
        ? (r1, r2) => Number(r1.cells[column].innerText) > Number(r2.cells[column].innerText) ? 1 : -1
        : (r1, r2) => r1.cells[column].innerText > r2.cells[column].innerText ? 1 : -1;
    body.append(...Array.from(body.rows).sort(sort));
}
async function AS() {
    const stationTBL = document.querySelector('#station-tbl');
    const columnSLT = document.querySelector('#column-slt');
    const stations = await (await fetch('AS.json')).json();
    const columns = ['ID', 'Название', 'Административный округ', 'Район', 'Адрес', 'Зона ответственности', 'Режим работы'];
    columns.forEach((c, i) => columnSLT.add(new Option(c, String(i))));
    appendRow(stationTBL.createTHead(), columns);
    const body = stationTBL.createTBody();
    stations.forEach(({ ID, Name, AdmArea, District, Address, ResponsibilityArea, WorkingHours }) => appendRow(body, [ID, Name, AdmArea, District, Address, ResponsibilityArea, WorkingHours]));
    columnSLT.addEventListener('change', () => {
        const col = Number(columnSLT.value);
        sortTable(body, col);
    });
}
document.addEventListener('DOMContentLoaded', AS);
//# sourceMappingURL=AS.js.map