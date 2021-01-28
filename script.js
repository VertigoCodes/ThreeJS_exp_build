import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();

//CAMERA
const fov = 85;
const nearClipping = 0.1
const farClipping = 1000
var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, nearClipping, farClipping);

//RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//WINDOW RESIZE CHECKER
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//MESH - DISABLED
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xFF5F5F, wireframe: false });
var cube = new THREE.Mesh(geometry, material);
//scene.add( cube )

//ADD CUSTOM MODEL
var LoadPage1 = function() {
    const loader = new GLTFLoader();

    loader.load(
        'SCENES/PG_1.gltf',
        function(gltf) {
            pg_1 = gltf.scene.children[0];
            pg_1.scale.set(0.8, 0.8, 0.8);
            scene.add(gltf.scene);
        },
        undefined,
        function(error) {
            console.error(error);
        }
    );
}


//LIGHTING
var pointLight = new THREE.PointLight(0xFFFFFF, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

var pointLight2 = new THREE.PointLight(0xF0F0F0, 1.4);
pointLight2.position.set(0, -50, 25);
scene.add(pointLight2);

//CAMERA SETUP
camera.position.z = 5;
camera.position.y = 5;
camera.rotation.x = -1;

//LOGIC
var update = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
};

var render = function() {
    renderer.render(scene, camera);
};

var GameLoop = function() {
    requestAnimationFrame(GameLoop);

    update();
    render();
}

LoadPage1();
GameLoop();