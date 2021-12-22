// @ts-ignore
function parsePlaces(places) {
    return places
        .filter(({ geoData }) => geoData != undefined)
        .map(({ P1, P2, P5, P7, geoData: { coordinates } }) => ({
        city: P1,
        district: P2,
        area: P5,
        street: P7,
        coordinates: coordinates[0]
    }));
}
// @ts-ignore
function fromRange(value, from, to, mult = 1000) {
    return (value - from) / (to - from) * mult;
}
// @ts-ignore
function drawPlaces(cvs, places) {
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'green';
    places.forEach(({ coordinates }) => {
        ctx.beginPath();
        coordinates.forEach(([lng, lat]) => {
            ctx.lineTo(Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)), Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5)));
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    });
}
function getStats(places, field) {
    return Object.entries(places.reduce((acc, p) => ({
        ...acc,
        [p[field]]: (acc[p[field]] ?? 0) + 1
    }), {}));
}
async function main() {
    const cvs = document.querySelector('#canvas');
    const data = await (await fetch('places.json')).json();
    const places = parsePlaces(data);
    console.table(places);
    drawPlaces(cvs, places);
    console.table(getStats(places, 'area'));
    console.table(getStats(places, 'street'));
}
document.addEventListener('DOMContentLoaded', main);
//# sourceMappingURL=index.js.map