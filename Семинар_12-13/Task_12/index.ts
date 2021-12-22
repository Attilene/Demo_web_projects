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

// @ts-ignore
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

// @ts-ignore
function fromRange(value: number, from: number, to: number, mult = 1000): number {
    return (value - from) / (to - from) * mult
}

// @ts-ignore
function drawPlaces(cvs: HTMLCanvasElement, places: Place[]) {
    const ctx = cvs.getContext('2d')
    ctx.fillStyle = 'orange'
    ctx.strokeStyle = 'green'

    places.forEach(({ coordinates }) => {
        ctx.beginPath()
        coordinates.forEach(([lng, lat]) => {
            ctx.lineTo(
                Math.round(fromRange(lat, 55, 56, cvs.offsetWidth / 5)),
                Math.round(fromRange(lng, 37, 38, cvs.offsetHeight / 5))
            )
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    })
}


function getStats(places: Place[], field: keyof Place): Array<[string, number]> {
    return Object.entries(
        places.reduce(
            (acc, p) => ({
                ...acc,
                [p[field] as any]: (acc[p[field] as any] ?? 0) + 1
            }),
            {}
        ))
}

async function main() {
    const cvs: HTMLCanvasElement = document.querySelector('#canvas')

    const data: RawPlace[] = await (await fetch('places.json')).json()
    const places = parsePlaces(data)

    console.table(places)

    drawPlaces(cvs, places)

    console.table(getStats(places, 'area'))
    console.table(getStats(places, 'street'))
}

document.addEventListener('DOMContentLoaded', main)
