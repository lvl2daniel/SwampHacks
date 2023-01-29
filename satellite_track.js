
// TODO: PUT API_KEY IN ENV VARIABLE SO ISNT ON GITHUB
const API_KEY = 'KCVZM4-3R58EF-Z427RQ-4ZGF';

// Set to true for local development
let LOCAL_PROXY = true; 

// Constructor for satellite objects
function Satellite(name, id, lon, lat, speed) {
    this.name = name;
    this.id = id;
    this.lon = lon;
    this.lat = lat;
    this.speed = speed;
}

let arr = [];

// Array for each satellite that represents its NORAD #
const sats = ['JWST', 'ISS', 'STARLINK-5196', 'NOAA', 'AQUA','KMS-4','SUOMI NPP',
              'METOP-B','CSS','TERRA','USA-338','USA-276','TK-1',
              'METEOR M2','NAVSTAR 81','LANDSAT 9','SWOT','SENTINEL-6',
               'ICON','PRISMA'];
const getSat = (sat) => {
    switch (sat) {
        case 'LANDSAT':
            return 49260;
        case 'TERRA':
            return 25994;
        case 'ISS':
            return 25544;
        case 'NOAA':
            return 43013;
        case 'AQUA':
            return 27424;
        case 'METEOR M2':
            return 40069;
        case 'SUOMI NPP':
            return 37849;
        case 'METOP-B':
            return 38771;
        case 'CSS':
            return 48274;
        case 'STARLINK-5196':
            return 55319;
        case 'USA-338':
            return 53883;
        case 'USA-276':
            return 42869;
        case 'TK-1':
            return 42061;
        case 'KMS-4':
            return  41332;
        case 'NAVSTAR 81':
            return 48859;
        case 'JWST':
            return 50463;
        case 'SWOT':
            return 54754;
        case 'SENTINEL-6':
            return 46984;
        case 'ICON':
            return 44628;
        case 'PRISMA':
            return 44072;
    }
}
// Debug function
export const printSats = () => {
    sats.forEach((sat) => {
        fetchSatData(getSat(sat), LOCAL_PROXY).then((res) => console.log(res));
    });
}

// Create array of each satellites updated position
export async function appendSatArray() {
    for (let i = 0; i < 5; i++) {
        arr[i] = await fetchSatData(getSat(sats[i]), LOCAL_PROXY, i);
    }
    return arr;
}

// Fetches satellite data from API and return Satellite object containing relevant info
async function fetchSatData(id, proxy, index) {
    let prefix = (proxy) ? '/localhost:8080/' : '';
    let response = await fetch('http:/' + prefix + 'api.n2yo.com/rest/v1/satellite/positions/' + id + '/41.702/-76.014/0/2/&apiKey=' + API_KEY);
    let data = await response.text();
    let jsoned = JSON.parse(data);
    let cord1 = jsoned.positions[0];
    let cord2 = jsoned.positions[1];
    let speed = getSpeed(cord1.satlatitude, cord1.satlongitude, cord2.satlatitude, cord2.satlongitude);
    let sat = new Satellite(sats[index], id, cord2.satlongitude, cord2.satlatitude, speed);

    return sat;
}


// Implementation of the Haversine formula to translate lon/lat cords to meters
const getSpeed = (lat1, lon1, lat2, lon2) => { 
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return (d * 1000) + 1000; // Meters
}

export function calcPosFromLatLon(lat,lon,radius){
    var phi   = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);
    
    let x = -((radius) * Math.sin(phi)*Math.cos(theta));
    let z = ((radius) * Math.sin(phi)*Math.sin(theta));
    let y = ((radius) * Math.cos(phi));

    return [x,y,z];
}


