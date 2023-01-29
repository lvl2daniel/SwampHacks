import * as THREE from 'three'
import { Object3D, RGBADepthPacking, SphereGeometry } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { printSats, appendSatArray, calcPosFromLatLon } from './satellite_track.js';

const canvasContainer = document.querySelector('#canvasContainer')

let arr = [];
async function update() {
    arr = await appendSatArray();
    await console.log(arr);
    await updateTracking(arr);
}

const scene = new THREE.Scene();
const camera = new THREE.
PerspectiveCamera(
    75,
    canvasContainer.offsetWidth / canvasContainer.offsetHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        canvas: document.querySelector('canvas')
    }
);

scene.background = new THREE.TextureLoader().load('./img/starz.jpg');
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearAlpha(100);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const light = new THREE.AmbientLight( 0xCFD1CC);
scene.add( light );

onWindowResize();
// Create earth sphere
const sphere = new THREE.Mesh(
new THREE.SphereGeometry(5, 100, 100),
new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./img/16kearth.jpg')
}));
scene.add(sphere);

function createObject(xCoord, yCoord, zCoord, name){
    const newSatellite = new THREE.Mesh(
        new THREE.SphereGeometry(.08, 5, 5),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./img/trippy-min.jpg')
        })
    )
    const a = new THREE.Vector3(3, 3, 3)
    newSatellite.translateX(xCoord);
    newSatellite.translateY(yCoord);
    newSatellite.translateZ(zCoord);
    scene.add(newSatellite);

    return newSatellite
}
function updateObject(Object, xCoord, yCoord, zCoord) {
    Object.position.set(xCoord, yCoord, zCoord);
}
let sat1 = createObject(5, 3, 3, 'test');

const SatArr = [];
function initialize() {
    for (let i = 0; i<arr.length; i++)
    {
        let result = calcPosFromLatLon(arr[i].lat, arr[i].lon, 5)
        SatArr[i] = createObject(result[0], result[1], 5)
    }
}

camera.position.z = 10
//console.log(sphere);
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = false;
controls.dampingFactor = 0.05;
controls.enablePan = false;

// Handle raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener( 'pointermove', onPointerMove );

// calculate pointer position in normalized device coordinates
// (-1 to +1) for both components
function onPointerMove( event ) {
	pointer.x = (( event.clientX / window.innerWidth ) * 2 - 1);
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );
    

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children, true );

	for (let i = 0; i < intersects.length; i++) {
        if (!intersects[i].object.geometry.type == "SphereGeometry") {
            console.log(intersects[i]);
        }
	}

    renderer.render(scene, camera);

}

// Handle window resizing
window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {
    let w = window.innerWidth * .8;
    let h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize( w, h );

}

function animate() {
    requestAnimationFrame(animate);
    render();
    //sphere.rotation.x += .0002;
    //sphere.rotation.y += .001;
    sat1.rotation.x += .002;
    sat1.rotation.y += .002;
    sat1.rotation.z += .002;
    for (let i = 0; i < arr.length; i++){
        //SatArr[i].rotation.x += .003;
        SatArr[i].color = red;
    }
}
animate();

// Handle info drawer 
const drawer = document.querySelector('.drawer-overview');
const openButton = document.querySelector('.open-drawer');
const closeButton = document.querySelector('sl-button[variant="primary"]');
const info_title = document.querySelector('.drawer-title');
const info_img = document.querySelector('.drawer-img');
const info_date = document.querySelector('.date');
const info_type = document.querySelector('.type')
const info_content = document.querySelector('.drawer-content');
let selected = 'JWST';
      
openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());

// Handle selector
const selector = document.querySelector('.selector');
selector.addEventListener('sl-change', () => {
    updateDrawer(selector.value);
});

const updateDrawer = (name) => {
    info_title.textContent = name;
    switch (name){
        case ('JWST'):
            info_date.textContent = 'December 25, 2021'
            info_type.textContent = 'Astronomy';
            info_content.textContent = 'The James Webb Space Telescope is a space telescope engineered by NASA, the ESA, and the CSA. It is a highly advanced space telescope that enables us to view objects too old, distant, or faint for other space telescopes.'
            return;
        case ('ISS'):
            info_date.textContent = 'November 20, 1998'
            info_type.textContent = 'Research'
            info_content.textContent = 'The International Space Station is the largest space station in low Earth orbit. It involves five space agencies known as NASA, Roscosmos, JAXA, ESA, and CSA. It orbits at a height of 254 miles above sea level, and orbits at a speed of 4.76 miles/seconds.'
            return;
        case ('STARLINK-5196'):
            info_date.textContent = 'January 19, 2023'
            info_type.textContent = 'Commercial'
            info_content.textContent = 'Starlink-5916 is one of many Starlink constellation satellites created by SpaceX to provide internet access and mobile phone access to 46 countries. It orbits at an approximation of 342 miles above sea level.'
            return;
        case ('NOAA-19'):
            info_date.textContent = 'February 6th, 2009'
            info_type.textContent = 'Weather'
            info_content.textContent = 'The NOAA-19 was with the purpose of replacing the NOAA-18 as the prime oceanic and atmospheric weather satellite. It orbits at a height of 528 miles above sea level.'
            return;
        case ('AQUA'):
            info_date.textContent = 'May 4th, 2002'
            info_type.textContent = 'Weather'
            info_content.textContent = 'The AQUA is a scientific research satellite engineered by NASA with the purpose of studying precipitation, evaporation, and cycling of water. It orbits at around 438 miles above sea level.'
            return;
        case ('KMS-4'):
            info_date.textContent = 'February 7th, 2016'
            info_type.textContent = 'Research'
            info_content.textContent = 'The KMS-4 is a earth observation satellite launched by North Korea. The satellite was strategically timed to coincide with late leader\'s Kim Jong-il\'s birthday on February 16th. It orbits at a height of 311 miles above sea level.'
            return;
        case ('SUOMI_NPP'):
            info_date.textContent = 'October 28th, 2011'
            info_type.textContent = 'Weather'
            info_content.textContent = 'The SUOMI NPP is a weather satellite operated by the US. It orbits at a height of 512 miles above sea level.'
            return;
        case ('METOP-B'):
            info_date.textContent = 'September 17th, 2012'
            info_type.textContent = 'Weather'
            info_content.textContent = 'The METOP-B was launched to replace the MetOP-A\'s primary operations. It was the second official flight unit ofthe EPS program and its main functionality is to monitor ocean, ice, climate, atmospheric chemistry, and space weather.'
            return;
        case ('CSS'):
            info_date.textContent = 'April 29th, 2021'
            info_type.textContent = 'Research'
            info_content.textContent = 'The Chinese Space Station also known as Tiangong Space Station was launched by China and is operated by the China Manned Space Agency to conduct research on space. Its orbit height is 264 miles above sea level.'
            return;
        case ('TERRA'):
            info_date.textContent = 'December 18th, 1999'
            info_type.textContent = 'Weather'
            info_content.textContent = 'TERRA is a multi-national NASA scientific research satellite that takes measurements of Earth\'s atmosphere, land, and water. It orbits at a height of 438 miles above sea level.'
            return;
        case('USA-338'):
            info_date.textContent = 'September 24, 2022';
            info_type.textContent = 'Military';
            info_content.textContent = 'The USA-338 is a US Military spy satellite whose purpose is to provide surveillance and reconnaissance.';
            return;
        
        case('USA-276'):
            info_date.textContent = 'May 1st, 2017';
            info_type.textContent = 'Military';
            info_content.textContent = 'The USA-276 was a reimbursement for the USA-193 which malfunctioned.';
            return;
        
        case('TK-1'):
            info_date.textContent = 'March 2nd, 2017';
            info_type.textContent = 'Military';
            info_content.textContent = 'The TK-1 is a Chinese experimental satellite launched by the CASIC. It was designed to test its satellite bus and perform smaller satellite operations.';
            return;
        
        case('METEOR-M2'):
            info_date.textContent = 'July 8th, 2014';
            info_type.textContent = 'Weather';
            info_content.textContent = 'The METEOR-M2 was the second Russian weather satellite of series METEOR-M launched.';
            return;
        case('NAVSTAR-81'):
            info_date.textContent = 'June 17th, 2021';
            info_type.textContent = 'GPS';
            info_content.textContent = 'The NAVSTAR 81 also known as USA-319/Neil Armstrong is a GPS/Navigation. Its purpose is to provide navigational data.';
            return;
        case('LANDSAT-9'):
            info_date.textContent = 'September 27, 2021';
            info_type.textContent = 'Research';
            info_content.textContent = 'The LANDSAT 9 is an Earth Observation satellite engineered by a collaboration of NASA and USGS. Its purpose is to conduct global observations relating to the monitoring, understanding, and managing Earth\'s natural resources. It orbits at a height of 438 miles above sea level.';
            return;
        case('SWOT'):
            info_date.textContent = 'December 16, 2022';
            info_type.textContent = 'Research';
            info_content.textContent = 'The SWOT is a satellite operated by NASA AND CNES to conduct research on water and topography.';
            return;
        case('SENTINEL-6'):
            info_date.textContent = 'November 21, 2020';
            info_type.textContent = 'RADAR';
            info_content.textContent = 'The SENTINEL-6 is a radar altimeter satellite developed by American and European organizations. It orbits at a height of 830 miles above sea level';
            return;
        case('ICON'):
            info_date.textContent = 'Research';
            info_type.textContent = 'October 10th, 2019';
            info_content.textContent = 'The ICON is a satellite engineered to observe and analyze changes in the ionosphere of Earth and the dynamic region high in our atmosphere.';
            return;
        case('PRISMA'):
            info_date.textContent = 'Research';
            info_type.textContent = 'March 22, 2019';
            info_content.textContent = 'The PRISMA is an ISA technology demonstrator satellite developed to deliver hyperspectral products to space. ';
            return;
}
};

const updateTracking = (arr) => {
    for (let i=0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i].name == selected) {
            console.log('found');
        }
    }
}

setTimeout(function () {
    update()
}, 4000);

setInterval(function (){
    initialize()
}, 5000);

setInterval(function () {
    for (let i = 0; i < arr.length; i++)
        {
            let result = calcPosFromLatLon(arr[i].lat, arr[i].lon, 5.3);
            updateObject(SatArr[i], result[0], result[1], result[2])
        }
}, 5000);

