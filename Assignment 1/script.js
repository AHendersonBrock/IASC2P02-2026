import * as THREE from 'three';
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color('black')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
//Cave Wall (plane)
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// OBJECTS

// Ground
const groundGeometry = new THREE.BoxGeometry(2, 0.5, 15)
const groundMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("green")
})
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
ground.castShadow = true
ground.position.set(15, -0.5, 0)
scene.add(ground)

// Tree
const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 32)
const trunkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("brown")
})
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
trunk.castShadow = true
trunk.position.set(15, 1.5, 0.5)
scene.add(trunk)

const branchGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32)
const branchMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("brown")
})
const branch = new THREE.Mesh(branchGeometry, branchMaterial)
branch.castShadow = true
branch.position.set(15, 1.8, 0)
branch.rotation.x = Math.PI * 0.5
scene.add(branch)

const leafGeometry = new THREE.SphereGeometry()
const leafMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("lime")
})
const leaf = new THREE.Mesh(leafGeometry, leafMaterial)
leaf.castShadow = true
leaf.position.set(15, 3, 0.5)
scene.add(leaf)

// Swing
const ropeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32)
const ropeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("tan")
})
const rope = new THREE.Mesh(ropeGeometry, ropeMaterial)
rope.castShadow = true
rope.position.set(0, -0.5, 0)

const tireGeometry = new THREE.TorusGeometry(0.25, 0.08)
const tireMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("black")
})
const tire = new THREE.Mesh(tireGeometry, tireMaterial)
tire.castShadow = true
tire.position.set(0, -1.2, 0)
tire.rotation.y = Math.PI * 0.5

const tireSwing = new THREE.Group();
tireSwing.add(rope);
tireSwing.add(tire);

const swingPivot = new THREE.Object3D();
swingPivot.position.set(15, 1.8, -0.2)
swingPivot.add(tireSwing)
scene.add(swingPivot)

// Clouds
const cloudMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("white")
})

const bCloudGeometry = new THREE.CapsuleGeometry(0.5, 2)
const bCloud1 = new THREE.Mesh(bCloudGeometry, cloudMaterial)
const bCloud2 = new THREE.Mesh(bCloudGeometry, cloudMaterial)
bCloud1.castShadow = true
bCloud2.castShadow = true
bCloud1.rotation.x = Math.PI * 0.5
bCloud2.rotation.x = Math.PI * 0.5
bCloud1.position.set(15, 5, 0)
bCloud2.position.set(15, 5, 0)
scene.add(bCloud2)

const tCloudGeometry = new THREE.SphereGeometry(0.7)
const tCloud1 = new THREE.Mesh(tCloudGeometry, cloudMaterial)
const tCloud2 = new THREE.Mesh(tCloudGeometry, cloudMaterial)
tCloud1.castShadow = true
tCloud2.castShadow = true
tCloud1.position.set(15, 5.4, 0)
tCloud2.position.set(15, 5.4, 0)
scene.add(tCloud2)

const cloud1 = new THREE.Group()
cloud1.add(bCloud1)
cloud1.add(tCloud1)
cloud1.position.set(0, 0, 4.5)

const cloud2 = new THREE.Group()
cloud2.add(bCloud2)
cloud2.add(tCloud2)
cloud2.position.set(0, 0, -4.5)

const cloudPivot = new THREE.Object3D()
cloudPivot.add(cloud1, cloud2)
scene.add(cloudPivot)

// Person
const bodyGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.4)
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("red")
})
const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
body.position.set(15, 0.5, -2)
body.castShadow = true

const headGeometry = new THREE.SphereGeometry(0.2)
const headMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("orange")
})
const head = new THREE.Mesh(headGeometry, headMaterial)
head.position.set(15, 1, -2)
head.castShadow = true

const legsGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.25)
const legsMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("brown")
})
const legs = new THREE.Mesh(legsGeometry, legsMaterial)
legs.position.set(15, 0.1, -1.999)
legs.castShadow = true

const armsGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.6)
const armsMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("red")
})
const arms = new THREE.Mesh(armsGeometry, armsMaterial)
arms.position.set(15, 0.6, -1.999)
arms.castShadow = true

const neckGeometry = new THREE.BoxGeometry(0.25, 0.3, 0.2)
const neckMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("orange")
})
const neck = new THREE.Mesh(neckGeometry, neckMaterial)
neck.position.set(15, 0.7, -1.999)
neck.castShadow = true

const person = new THREE.Group();
person.add(head)
person.add(neck)
person.add(body)
person.add(arms)
person.add(legs)
person.position.set(-0.5, -0.2, 0)
scene.add(person)

// Mole & Mound
const moundGeometry = new THREE.TorusGeometry(0.3, 0.2)
const moundMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("brown")
})
const mound = new THREE.Mesh(moundGeometry, moundMaterial)
mound.castShadow = true
mound.rotation.x = Math.PI * 0.5
mound.position.set(15, -0.15, 3)
scene.add(mound)

const moleGeometry = new THREE.CapsuleGeometry(0.2, 0.3)
const moleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("tan")
})
const mole = new THREE.Mesh(moleGeometry, moleMaterial)
mole.castShadow = true
mole.position.set(15, -0.4, 3)
scene.add(mole)

/************
 ** LIGHTS **
 ************/
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color("white"),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

/*********************
** DOM INTERACTIONS **
*********************/
const domObject = {
    part: 1,
    changeOne: false,
    changeTwo: false,
    changeThree: false,
    changeFour: false
}

// part-one
document.querySelector("#part-one").onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector("#part-two").onclick = function() {
    domObject.part = 2
}

// change-one
document.querySelector("#change-one").onclick = function() {
    domObject.changeOne = true
}

// change-two
document.querySelector("#change-two").onclick = function() {
domObject.changeTwo = true
}

// change-three
document.querySelector("#change-three").onclick = function() {
domObject.changeThree = true
}

// change-four
document.querySelector("#change-four").onclick = function() {
domObject.changeFour = true
}

/*******
** UI **
********/
// UI
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder("Light Position")

lightPositionFolder
    .add(directionalLight.position, "y")
    .min(-10)
    .max(10)
    .step(0.1)
    .name("Y")

lightPositionFolder
    .add(directionalLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.1)
    .name("Z")
    */

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => {
    // Return elaspedTime
    const elaspedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part === 1) {
        camera.position.set(7, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2) {
        camera.position.set(25, 3, 2)
        camera.lookAt(0, 0, 0)
    }

    // change-one
    if(domObject.changeOne) {
        swingPivot.rotation.z = Math.cos(elaspedTime)
    }

    // change-two
    if(domObject.changeTwo) {
        cloudPivot.position.z = Math.sin(elaspedTime) * 3
    }

    // change-three
    if(domObject.changeThree) {
        person.position.z = Math.cos(elaspedTime) * 2
    }

    // change-four
    if(domObject.changeFour) {
        mole.position.y = Math.cos(elaspedTime) * 0.2 - 0.1
    }

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()