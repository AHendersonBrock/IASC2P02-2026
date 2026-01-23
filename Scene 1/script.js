import * as THREE from "three"

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
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** Meshes **
 ************/
const Material = new THREE.MeshNormalMaterial();
const octahedronGeometry = new THREE.OctahedronGeometry();
const octahedron = new THREE.Mesh( octahedronGeometry, Material );
const octahedron02 = new THREE.Mesh( octahedronGeometry, Material );
const octahedron03 = new THREE.Mesh( octahedronGeometry, Material );
const octahedron04 = new THREE.Mesh( octahedronGeometry, Material );
const octahedron05 = new THREE.Mesh( octahedronGeometry, Material );
scene.add(octahedron);
scene.add(octahedron02);
scene.add(octahedron03);
scene.add(octahedron04);
scene.add(octahedron05);


/********************
 ** ANIMATION LOOP **
 ********************/

const clock = new THREE.Clock()


const animation = () =>
{
    // console.log("tick")
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    // Animate Octahedron
    octahedron.position.x = Math.sin(elapsedTime)
    octahedron02.position.y = Math.sin(elapsedTime)
    octahedron03.position.z = Math.sin(elapsedTime)
    octahedron04.position.y = Math.sin(-elapsedTime)
    octahedron05.position.z = Math.sin(-elapsedTime)

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()

// console.log("hello world")