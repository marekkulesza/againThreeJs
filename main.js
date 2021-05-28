import './style.css'
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GridHelper, LoadingManager, PointLight } from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setY(15);
camera.position.setZ(15);

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Grid Helper & Orbit Controls
// const gridHelper = new THREE.GridHelper(100,100);
// scene.add(gridHelper)
const controls = new OrbitControls(camera,renderer.domElement);

// Lights
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);
const lightHelper1 = new THREE.PointLightHelper(light1)
scene.add(lightHelper1)


// Loaders go into the manager here
const manager = new LoadingManager();
manager.addHandler( /\.gltf$/i, new GLTFLoader() );
const loader = new GLTFLoader(manager);

// Objects go here
// Switches
loader.load('rectangle.glb', function ( Flex2410G ) {
  Flex2410G.scene.scale.multiplyScalar(0.5)
  scene.add(Flex2410G.scene);
});

loader.load('rectangleMedium.glb', function ( Flex8 ) {
  Flex8.scene.scale.multiplyScalar(0.5)
  Flex8.scene.position.setX(-13)
  scene.add(Flex8.scene);
});

loader.load('rectangleSmall.glb', function ( FlexBase ) {
  FlexBase.scene.scale.multiplyScalar(0.5)
  FlexBase.scene.position.setX(13)

  scene.add(FlexBase.scene);
});

// Wires
loader.load('wire.glb', function ( wireForFlex24 ) {
  scene.add(wireForFlex24.scene);
  wireForFlex24.scene.position.setY(0.2)
});

loader.load('wire.glb', function ( wireForFlex8 ) {
  wireForFlex8.scene.position.setX(-13)
  wireForFlex8.scene.position.setY(0.2)
  scene.add(wireForFlex8.scene);
});

loader.load('wireDistance.glb', function ( wireForFlexBase ) {
  wireForFlexBase.scene.position.setX(13)
  wireForFlexBase.scene.position.setY(0.2)
  scene.add(wireForFlexBase.scene);
});

// Flex Links
loader.load('Flex-Link.glb', function ( FlexLinkforFlex24 ) {
  FlexLinkforFlex24.scene.position.setY(0.2)
  FlexLinkforFlex24.scene.position.setZ(90)
  scene.add(FlexLinkforFlex24.scene);
});

loader.load('Flex-Link.glb', function ( FlexLinkforFlex8 ) {
  FlexLinkforFlex8.scene.position.setX(-13)
  FlexLinkforFlex8.scene.position.setY(0.2)
  FlexLinkforFlex8.scene.position.setZ(90)
  scene.add(FlexLinkforFlex8.scene);
});

loader.load('Flex-Link.glb', function ( FlexLinkforBase ) {
  FlexLinkforBase.scene.position.setX(13)
  FlexLinkforBase.scene.position.setY(0.2)
  FlexLinkforBase.scene.position.setZ(90)
  scene.add(FlexLinkforBase.scene);
});

// Cameras for the links
loader.load('PTZCamera.glb', function ( PTZCameraforFlex24 ) {
  PTZCameraforFlex24.scene.position.setY(0.2)
  PTZCameraforFlex24.scene.position.setZ(101)
  scene.add(PTZCameraforFlex24.scene);
});

loader.load('camera.glb', function ( CameraforFlex8 ) {
  CameraforFlex8.scene.position.setX(-13)
  CameraforFlex8.scene.position.setY(0.5)
  CameraforFlex8.scene.position.setZ(100)
  scene.add(CameraforFlex8.scene);
});

loader.load('camera.glb', function ( CameraforBase ) {
  CameraforBase.scene.position.setX(13)
  CameraforBase.scene.position.setY(0.5)
  CameraforBase.scene.position.setZ(100)
  scene.add(CameraforBase.scene);
});


// Camera move function 
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 15 + (t * -0.01);
}
document.body.onscroll = moveCamera;

// Background loading a white picture for its background
const background = new THREE.TextureLoader().load('white.png')
scene.background = background;

// Animate 
function animate() {
  controls.update();
  requestAnimationFrame(animate)
  renderer.render(scene, camera);
}
animate()