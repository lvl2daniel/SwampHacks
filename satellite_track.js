// TODO: PUT API_KEY IN ENV VARIABLE SO ISNT ON GITHUB
const API_KEY = 'DLN4MT-FSAJLH-SUJFHN-4ZFE';

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

// Array for each satellite that represents its NORAD #
const sats = ['LANDSAT', 'TERRA', 'ISS', 'NOAA', 'AQUA'];
const getSat = (sat) => {
    switch (sat) {
        case 'LANDSAT':
            return 39084;
        case 'TERRA':
            return 25994;
        case 'ISS':
            return 25544;
        case 'NOAA':
            return 43013;
        case 'AQUA':
            return 27424;
    }
}

export const printSats = () => {
    sats.forEach((sat) => {
        fetchSatData(getSat(sat), LOCAL_PROXY).then((res) => console.log(res));
    });
}

const getSatelliteData = () => {
    sats.forEach((sat) )
}

// Fetches satellite data from API and return Satellite object containing relevant info
async function fetchSatData(id, proxy) {
    prefix = (proxy) ? '/localhost:8080/' : '';
    let response = await fetch('http:/' + prefix + 'api.n2yo.com/rest/v1/satellite/positions/' + id + '/41.702/-76.014/0/2/&apiKey=' + API_KEY);
    let data = await response.text();
    let jsoned = JSON.parse(data);
    let cord1 = jsoned.positions[0];
    let cord2 = jsoned.positions[1];
    let speed = getSpeed(cord1.satlatitude, cord1.satlongitude, cord2.satlatitude, cord2.satlongitude);
    let sat = new Satellite(jsoned.info.satname, id, cord2.satlongitude, cord2.satlatitude, speed);

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



