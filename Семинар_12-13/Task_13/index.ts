// @ts-ignore
type Coord = Array<[number, number]>

interface RawPlace {
    P1: string,
    P2: string,
    P5: string,
    P7: string,
    geoData: {
        coordinates: Coord[]
    }
}

interface Place {
    city: string,
    district: string,
    area: string,
    street: string,
    coordinates: Coord
}

function parsePlaces(places: RawPlace[]): Place[] {
    return places
        .filter(({ geoData }) => geoData != undefined)
        .map(({ P1, P2, P5, P7, geoData: { coordinates } }) => ({
            city: P1,
            district: P2,
            area: P5,
            street: P7,
            coordinates: coordinates[0]
        }))
}

function generateRandomNumbers(max, len): any[] {
    let listOfNums = []
    for (let i = 0; i < len; i++) {
        listOfNums.push([Math.floor(Math.random() * max), Math.floor(Math.random() * max)]);
    }
    return listOfNums
}


function fromRange(value: number, from: number, to: number, mult = 1000): number {
    return (value - from) / (to - from) * mult
}

function drawPlaces(cvs: HTMLCanvasElement, places: Place[]) {
    const ctx = cvs.getContext('2d')
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = 'green'
    ctx.fillStyle = 'green'

    let listOfNums = []
    places.forEach(({ coordinates }) => {
        ctx.beginPath()
        coordinates.forEach(([lng, lat]) => {
            listOfNums.push([Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)),
                Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5))]);
            ctx.lineTo(
                Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)),
                Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5))
            )
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    })

    taskFunc(ctx, listOfNums);
}

function drawRandom(cvs: HTMLCanvasElement, dots: any[]) {
    const ctx = cvs.getContext('2d')
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green';

    dots.forEach(element => ctx.fillRect(element[0], element[1], 1, 1));

    taskFunc(ctx, dots);
}

function taskFunc(ctx: CanvasRenderingContext2D, dots: any[]) {
    const x: HTMLInputElement = document.querySelector("#input_x")
    const y: HTMLInputElement = document.querySelector("#input_y")
    const radius: HTMLInputElement = document.querySelector("#radius")
    const answer: HTMLLabelElement = document.querySelector("#answer")


    var counter: number = 0;
    ctx.beginPath();
    ctx.arc(Number(x.value), Number(y.value), Number(radius.value), 0, (Math.PI / 180) * 360);
    ctx.stroke();
    ctx.closePath();

    dots.forEach(element => {
        if (check_a_point(element[0], element[1], Number(x.value), Number(y.value), Number(radius.value))) {
            counter += 1;
        }
    })
    answer.innerHTML = String(counter);
}

function check_a_point(a: number, b: number, x: number, y: number, r: number): boolean {
    var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
    r *= r;
    return dist_points < r;
}

async function task_12() {
    const cvs: HTMLCanvasElement = document.querySelector('#canvas')

    const data: RawPlace[] = await (await fetch('places.json')).json()
    const places = parsePlaces(data)

    drawPlaces(cvs, places)
}

async function task_13() {
    const cvs: HTMLCanvasElement = document.querySelector('#canvas')

    const places = generateRandomNumbers(500, 1000)

    drawRandom(cvs, places)
}
