interface RescueStation {
    ID: number,
    Name: string,
    AdmArea: string,
    District: string,
    Address: string,
    ResponsibilityArea: string,
    WorkingHours: string
}

function appendCell(row: HTMLTableRowElement, value: unknown) {
    row.insertCell().innerText = String(value)
}

function appendRow(section: HTMLTableSectionElement, values: unknown[]) {
    const row = section.insertRow()
    values.forEach(v => appendCell(row, v))
}

function sortTable(body: HTMLTableSectionElement, column: number) {
    const sort = !isNaN(Number(body.rows[0].cells[column].innerText))
        ? (r1: HTMLTableRowElement, r2: HTMLTableRowElement) =>
            Number(r1.cells[column].innerText) > Number(r2.cells[column].innerText) ? 1 : -1
        : (r1: HTMLTableRowElement, r2: HTMLTableRowElement) =>
            r1.cells[column].innerText > r2.cells[column].innerText ? 1 : -1

    body.append(...Array.from(body.rows).sort(sort))
}


async function AS() {
    const stationTBL = document.querySelector('#station-tbl') as HTMLTableElement
    const columnSLT = document.querySelector('#column-slt') as HTMLSelectElement
    const sortBTN = document.querySelector('#sort-btn') as HTMLButtonElement

    const stations: RescueStation[] = await (await fetch('AS.json')).json()
    const columns: string[] = ['ID', 'Название', 'Административный округ', 'Район', 'Адрес', 'Зона ответственности', 'Режим работы']

    columns.forEach((c, i) => columnSLT.add(new Option(c, String(i))))

    appendRow(stationTBL.createTHead(), columns)
    const body = stationTBL.createTBody()
    stations.forEach(({ ID, Name, AdmArea, District, Address, ResponsibilityArea, WorkingHours }) =>
        appendRow(body, [ID, Name, AdmArea, District, Address, ResponsibilityArea, WorkingHours]))

    sortBTN.addEventListener('click', () => {
        const col = Number(columnSLT.value)

        if (isNaN(col))
            alert("Выберете колонку для сортировки")
        else
            sortTable(body, col)
    })
}

document.addEventListener('DOMContentLoaded', AS)
