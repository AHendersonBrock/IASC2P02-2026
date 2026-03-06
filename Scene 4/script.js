import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/********** 
 ** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

// Resizing
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
************/

// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)



/************
 ** MESHES **
 ************/
// Cube Geomtry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const diamondGeometry = new THREE.SphereGeometry(0.5, 0.5, 0.5)
const torusgeometry = new THREE.TorusKnotGeometry( 0.5, 0.2, 100, 16 );
let objectList = [];
const drawCube = (height, color) => {
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Position cube
    cube.position.x = (Math.random() - 0.5) * uiObject.spread
    cube.position.z = (Math.random() - 0.5) * uiObject.spread
    cube.position.y = height - 10

    // Randomize cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(cube)
    objectList.push(cube)
}
const drawSphere = (height, color) => {
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const sphere = new THREE.Mesh(sphereGeometry, material)

    // Position cube
    sphere.position.x = (Math.random() - 0.5) * uiObject.spread
    sphere.position.z = (Math.random() - 0.5) * uiObject.spread
    sphere.position.y = height - 10

    // Add cube to scene
    scene.add(sphere)
    objectList.push(sphere)
}
const drawDiamond = (height, color) => {
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const sphere = new THREE.Mesh(diamondGeometry, material)

    // Position cube
    sphere.position.x = (Math.random() - 0.5) * uiObject.spread
    sphere.position.z = (Math.random() - 0.5) * uiObject.spread
    sphere.position.y = height - 10

      // Randomize cube rotation
    sphere.rotation.x = Math.random() * 2 * Math.PI
    sphere.rotation.z = Math.random() * 2 * Math.PI
    sphere.rotation.y = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(sphere)
    objectList.push(sphere)
}
const drawTorus = (height, color) => {
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const sphere = new THREE.Mesh(torusgeometry, material)

    // Position cube
    sphere.position.x = (Math.random() - 0.5) * uiObject.spread
    sphere.position.z = (Math.random() - 0.5) * uiObject.spread
    sphere.position.y = height - 10

      // Randomize cube rotation
    sphere.rotation.x = Math.random() * 2 * Math.PI
    sphere.rotation.z = Math.random() * 2 * Math.PI
    sphere.rotation.y = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(sphere)
    objectList.push(sphere)
}

const removeObjects = () => {
    objectList.forEach(function (object) {
        scene.remove(object)
    })
}

//drawCube(0, 'pink')
//drawCube(5, 'pink')


/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

const uiObject =
{
    amount: 1,
    spread: 10,
    layerSpacing: 0.2,
    type: "cube"
}

const cubeFolder = ui.addFolder('Cubes')

cubeFolder
    .add(uiObject, 'amount')
    .min(1)
    .max(500)
    .step(1)
    .name('Amount of Objects')
    .onChange(() => {
        removeObjects()
        findSearchTermInTokenizedText("cat", "cyan")
        findSearchTermInTokenizedText("dog", "magenta")
        findSearchTermInTokenizedText("catdog", "green")
    })

cubeFolder
    .add(uiObject, 'type', ["cube","sphere","diamond","torus"])
    .name('Object Type')
    .onChange(() => {
        removeObjects()
        findSearchTermInTokenizedText("cat", "cyan")
        findSearchTermInTokenizedText("dog", "magenta")
        findSearchTermInTokenizedText("catdog", "green")
    })

    cubeFolder
    .add(uiObject, 'spread')
    .name('Object Spread')
     .min(1)
    .max(100)
    .step(1)
    .onChange(() => {
        removeObjects()
        findSearchTermInTokenizedText("cat", "cyan")
        findSearchTermInTokenizedText("dog", "magenta")
        findSearchTermInTokenizedText("catdog", "green")
    })

    cubeFolder
    .add(uiObject, 'layerSpacing')
    .min(100)
    .max(200)
    .step(1)
    .name('Space Between Layers')
    .onChange(() => {
        removeObjects()
        findSearchTermInTokenizedText("cat", "cyan")
        findSearchTermInTokenizedText("dog", "magenta")
        findSearchTermInTokenizedText("catdog", "green")
    })


/******************
** TEXT ANALYSIS **
*******************/
const sourceText = "Doctor Catterton developed his career by combing various animals. He started with rats and bats, creating the Ratbat. Then he moved on to cats and dogs. The first catdog were more dog than cat but later they became more cat than dog. Eventually he settled on 75% dog and 25% cat which created a cat-like dog moreso than a dog-like cat. A perfect catdog was impossible to achieve."

// Variables
let parsedText, tokenizedText

// Parse and Toknize sourceText
const tokenizeSourceText = () => {
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)

}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) => {
    // Use a for loop to go through the toknizedText array
    for (let i = 0; i < tokenizedText.length; i++) {
        // If tokenized Tex[i] matches our searchTerm, then we draw a cube
        if (tokenizedText[i] === term) {
            // convert i into height, which is a value between 0 and 20
            const height = (uiObject.layerSpacing / tokenizedText.length) * i * 0.2

            // call drawCube function 100 times using converted height value
            for (let a = 0; a < uiObject.amount; a++) {
                if (uiObject.type == "cube")
                    drawCube(height, color)
                else if (uiObject.type == "sphere")
                    drawSphere(height, color)
                else if (uiObject.type == "diamond")
                    drawDiamond(height, color)
                else if(uiObject.type == "torus")
                    drawTorus(height, color)
            }
        }
    }
}


tokenizeSourceText()
findSearchTermInTokenizedText("cat", "cyan")
findSearchTermInTokenizedText("dog", "magenta")
findSearchTermInTokenizedText("catdog", "green")



/********************
 ** ANIMATION LOOP ** 
 ********************/
const clock = new THREE.Clock()

const animation = () => {
    // Return elapsedtime
    const elapsedTime = clock.getElapsedTime()
    
    objectList.forEach((object)=>{
        object.position.y += Math.sin(elapsedTime)*0.01;
        object.rotation.x += 0.05
    })

    // Update OrbitControls
    controls.update()

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)

}

animation()






