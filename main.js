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
    document.body.appendChild(renderer.
        domElement);
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(150,150,1000,1000),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('starz.jpg')
        })
    )
    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(8, 900, 900),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('16kearth.jpg')
    }))

    scene.add(sphere);
    scene.add(plane);
    console.log(plane);
    camera.position.z = 20
    console.log(sphere);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.x += .0005;
        sphere.rotation.y += .001;
    }
    animate();


