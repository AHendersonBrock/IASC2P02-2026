import * as THREE from "three"
import * as dat from 'lil-gui'
import { OrbitControls } from "OrbitControls"

/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector('.webgl')


// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('darkseagreen')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

// Controls
const controls = new OrbitControls(camera, canvas)

/************
 ** Meshes **
 ************/
const Material = new THREE.MeshNormalMaterial();
const octahedronGeometry = new THREE.OctahedronGeometry();
const octahedron = new THREE.Mesh(octahedronGeometry, Material);
const octahedron02 = new THREE.Mesh(octahedronGeometry, Material);
const octahedron03 = new THREE.Mesh(octahedronGeometry, Material);
const octahedron04 = new THREE.Mesh(octahedronGeometry, Material);
const octahedron05 = new THREE.Mesh(octahedronGeometry, Material);
scene.add(octahedron);
scene.add(octahedron02);
scene.add(octahedron03);
scene.add(octahedron04);
scene.add(octahedron05);

//Plane
const planeGeometry = new THREE.PlaneGeometry(10,10,50,50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = Math.PI * 0.5;
scene.add(plane)

/********
 * UI
 ******/

//UI
const UI = new dat.GUI()

//UI Objects
const uiObject =
{
    speed: 1,
    distance: 1
}

//plane UI
const planeFolder = UI.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// TestSphere UI
const sphereFolder = UI.addFolder('Sphere')

sphereFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(50)
    .step(0.1)
    .name('Speed')

sphereFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')


/********************
 ** ANIMATION LOOP **
 ********************/

const clock = new THREE.Clock()


const animation = () => {
    // console.log("tick")
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    // Animate Octahedron
    octahedron.position.x = Math.sin(elapsedTime)
    octahedron02.position.y = Math.sin(elapsedTime)
    octahedron03.position.z = Math.sin(elapsedTime)
    octahedron04.position.y = Math.sin(-elapsedTime)
    octahedron05.position.z = Math.sin(-elapsedTime)

     // Update OrbitControls
    controls.update()
    controls.enableDamping = true

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()

// console.log("hello world")