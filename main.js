import * as THREE from 'three'
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
    console.log(scene);
    console.log(camera);
    console.log(renderer);
    renderer.setSize(window.innerWidth*1.5, window.innerHeight*1.5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearAlpha(100);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( -.45, .67, .80 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    document.body.appendChild(renderer.
        domElement);
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(150,150,1000,1000),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('starz.jpg')
        })
    )
    plane.receiveShadow = false;
    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(8, 900, 900),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('16kearth.jpg')
        
    }))

    scene.add(sphere);
    scene.add(plane);
    console.log(plane);
    camera.position.z = 25
    console.log(sphere);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        //sphere.rotation.x += .0005;
        //sphere.rotation.y += .001;
    }
    animate();

