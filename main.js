import * as THREE from 'three'
import { Object3D, RGBADepthPacking } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { printSats } from './satellite_track.js';
//import vertexShader from './shaders/vertex.glsl'
//import fragmentShader from './shaders/fragment.glsl'

printSats();
const scene = new THREE.Scene();
const camera = new THREE.
    PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer(
        {
            antialias: true
        
        }
    );
    scene.background = new THREE.TextureLoader().load('./img/starz.jpg');
    console.log(scene);
    console.log(camera);
    console.log(renderer);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearAlpha(100);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const light = new THREE.AmbientLight( 0xCFD1CC);
    scene.add( light );
    
    document.body.appendChild(renderer.
        domElement);
    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 100, 100),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('./img/16kearth.jpg')
        
    }))
    scene.add(sphere);
    function createObject(xCoord, yCoord, zCoord, img, name){
        const newSattelite = new THREE.Mesh(
            new THREE.ConeGeometry(.1, .05, 3, 1),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        )
        const a = new THREE.Vector3(3, 3, 3)
        newSattelite.translateX(xCoord);
        newSattelite.translateY(yCoord);
        newSattelite.translateZ(zCoord);
        name = newSattelite;
        console.log(name);
        scene.add(name);
    }
    camera.position.z = 10
    console.log(sphere);
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false;
    controls.dampingFactor = .5;
    controls.enablePan = false;
    createObject(4, 4, 3.3, 3, 'newSat');

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        //sphere.rotation.x += .0005;
        //sphere.rotation.y += .001;
    }
    animate();


     
