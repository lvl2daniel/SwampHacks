import * as THREE from 'three'
import { Object3D, RGBADepthPacking, SphereGeometry } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { printSats, appendSatArray, calcPosFromLatLon } from './satellite_track.js';

const canvasContainer = document.querySelector('#canvasContainer')

let arr = [];
async function update() {
    arr = await appendSatArray();
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

const drawer = document.querySelector('.drawer-overview');
const openButton = document.querySelector('.open-drawer');
const closeButton = drawer.querySelector('sl-button[variant="primary"]');
      
console.log(openButton);
openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());

setInterval(function () {
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


     