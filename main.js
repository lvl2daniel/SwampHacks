import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearAlpha(100);
    document.body.appendChild(renderer.
        domElement);

    const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 90, 90),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader
    }))

    scene.add(sphere);
    camera.position.z = 15
    console.log(sphere);
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        sphere.rotation.x += .00005;
        sphere.rotation.y += .001;
    }
    animate();


