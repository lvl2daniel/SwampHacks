import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import vertexShader from './shaders/vertex.glsl'
//import fragmentShader from './shaders/fragment.glsl'

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
    scene.background = new THREE.TextureLoader().load('starz.jpg');
    console.log(scene);
    console.log(camera);
    console.log(renderer);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearAlpha(100);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const light = new THREE.DirectionalLight( 0xffffff, 1.2);
    light.position.set( -.45, .67, .40 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    
    document.body.appendChild(renderer.
        domElement);

    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 100, 100),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('16kearth.jpg')
        
    }))
    function createObject(xCoord, yCoord, zCoord, img, name){
        const name = new THREE.Mesh(
            new THREE.
        )


    }
    scene.add(sphere);
    camera.position.z = 10
    console.log(sphere);
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = false;
    controls.dampingFactor = .5;
    controls.enablePan = false;
    

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.x += .0005;
        //sphere.rotation.y += .001;
    }
    animate();


     
