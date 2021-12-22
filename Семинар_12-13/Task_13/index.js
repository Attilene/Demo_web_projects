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
function generateRandomNumbers(max, len) {
    let listOfNums = [];
    for (let i = 0; i < len; i++) {
        listOfNums.push([Math.floor(Math.random() * max), Math.floor(Math.random() * max)]);
    }
    return listOfNums;
}
function fromRange(value, from, to, mult = 1000) {
    return (value - from) / (to - from) * mult;
}
function drawPlaces(cvs, places) {
    const ctx = cvs.getContext('2d');
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'green';
    let listOfNums = [];
    places.forEach(({ coordinates }) => {
        ctx.beginPath();
        coordinates.forEach(([lng, lat]) => {
            listOfNums.push([Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)),
                Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5))]);
            ctx.lineTo(Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)), Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5)));
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    });
    taskFunc(ctx, listOfNums);
}
function drawRandom(cvs, dots) {
    const ctx = cvs.getContext('2d');
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    dots.forEach(element => ctx.fillRect(element[0], element[1], 1, 1));
    taskFunc(ctx, dots);
}
function taskFunc(ctx, dots) {
    const x = document.querySelector("#input_x");
    const y = document.querySelector("#input_y");
    const radius = document.querySelector("#radius");
    const answer = document.querySelector("#answer");
    var counter = 0;
    ctx.beginPath();
    ctx.arc(Number(x.value), Number(y.value), Number(radius.value), 0, (Math.PI / 180) * 360);
    ctx.stroke();
    ctx.closePath();
    dots.forEach(element => {
        if (check_a_point(element[0], element[1], Number(x.value), Number(y.value), Number(radius.value))) {
            counter += 1;
        }
    });
    answer.innerHTML = String(counter);
}
function check_a_point(a, b, x, y, r) {
    var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
    r *= r;
    return dist_points < r;
}
async function task_12() {
    const cvs = document.querySelector('#canvas');
    const data = await (await fetch('places.json')).json();
    const places = parsePlaces(data);
    drawPlaces(cvs, places);
}
async function task_13() {
    const cvs = document.querySelector('#canvas');
    const places = generateRandomNumbers(500, 1000);
    drawRandom(cvs, places);
}
//# sourceMappingURL=index.js.map