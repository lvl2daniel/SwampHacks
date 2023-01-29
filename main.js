import * as THREE from 'three'
import { Object3D, RGBADepthPacking } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { printSats, appendSatArray, calcPosFromLatLon } from './satellite_track.js';

const canvasContainer = document.querySelector('#canvasContainer')
let WIDTH = canvasContainer.innerWidth/2;
let HEIGHT = canvasContainer.innerHeight;
console.log(WIDTH);

let arr = [];
async function update() {
    arr = await appendSatArray();
}

const scene = new THREE.Scene();
const camera = new THREE.
PerspectiveCamera(
    75,
    1,
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
renderer.setSize(canvasContainer.offsetHeight, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearAlpha(100);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const light = new THREE.AmbientLight( 0xCFD1CC);
scene.add( light );

// Create earth sphere
const sphere = new THREE.Mesh(
new THREE.SphereGeometry(3, 70, 70),
new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./img/16kearth.jpg')
}));
scene.add(sphere);

function createObject(xCoord, yCoord, zCoord, name){
    const newSatellite = new THREE.Mesh(
        new THREE.ConeGeometry(.05, .025, 3, 1),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    )
    const a = new THREE.Vector3(3, 3, 3)
    newSatellite.translateX(xCoord);
    newSatellite.translateY(yCoord);
    newSatellite.translateZ(zCoord);
    console.log(newSatellite);
    scene.add(newSatellite);

    return newSatellite
}
function updateObject(Object, xCoord, yCoord, zCoord) {
    Object.position.set(xCoord, yCoord, zCoord);
}
const SatArr = [];
function initialize() {
    for (let i = 0; i<arr.length; i++)
    {
        let result = calcPosFromLatLon(arr[i].lat, arr[i].lon, 5)
        SatArr[i] = createObject(i+5, i+6, i+7)
        console.log(SatArr[i]);
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
	const intersects = raycaster.intersectObjects( scene.children );

	for (let i = 0; i < intersects.length; i++) {
        console.log("INTERSECT");
	}

    renderer.render(scene, camera);

}

function animate() {
    requestAnimationFrame(animate);
    render();
    sphere.rotation.x += .0002;
    sphere.rotation.y += .001;
}
animate();

setInterval(function () {
    update()
}, 4000);

setInterval(function (){
    initialize()
}, 5000);

setInterval(function () {
    for (let i = 0; i < arr.length; i++)
        {
            let result = calcPosFromLatLon(arr[i].lat, arr[i].lon, 5.2);
            updateObject(SatArr[i], result[0], result[1], result[2])
        }
}, 5000);

     