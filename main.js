import * as THREE from 'three'
import { Object3D, RGBADepthPacking } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { printSats, appendSatArray, calcPosFromLatLon } from './satellite_track.js';
//import vertexShader from './shaders/vertex.glsl'
//import fragmentShader from './shaders/fragment.glsl'

let arr = [];
async function update() {
    arr = await appendSatArray();
    console.log(arr);
}

const scene = new THREE.Scene();
const camera = new THREE.
PerspectiveCamera(
    75,
    window.innerWidth/2 / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        canvas: document.querySelector('canvas')
    }
);

const canvasContainer = document.querySelector('#canvasContainer')
scene.background = new THREE.TextureLoader().load('./img/starz.jpg');
console.log(scene);
console.log(camera);
console.log(renderer);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearAlpha(100);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const light = new THREE.AmbientLight( 0xCFD1CC);
scene.add( light );

const sphere = new THREE.Mesh(
new THREE.SphereGeometry(5, 100, 100),
new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./img/16kearth.jpg')
}));
scene.add(sphere);

function createObject(xCoord, yCoord, zCoord, name){
    const newSatellite = new THREE.Mesh(
        new THREE.ConeGeometry(.1, .05, 3, 1),
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
const Sat1 = createObject(0, 0, 0, 'newSat');

camera.position.z = 10
console.log(sphere);
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = false;
controls.dampingFactor = .5;
controls.enablePan = false;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //sphere.rotation.x += .0005;
    //sphere.rotation.y += .001;
}
animate();

setTimeout(function () {
    update()
}, 2000);

setTimeout(function () {
    let result = calcPosFromLatLon(arr[0].lat, arr[0].lon, 5);
    updateObject(Sat1, result[0], result[1], result[2]);
}, 5000);

     