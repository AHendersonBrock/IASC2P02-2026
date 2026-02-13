import * as THREE from "three"
import * as dat from "lil-gui"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OrbitControls } from "OrbitControls"

/********** 
 ** SETUP **
***********/
// Sizes
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10,2,7.5)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects

// Eyes
const cubeGeometry = new THREE.BoxGeometry(2, 2, 1)
const longGeometry = new THREE.BoxGeometry(4,4,4)
const eyeMaterial = new THREE.MeshNormalMaterial()

const cube1 = new THREE.Mesh(cubeGeometry, eyeMaterial)
cube1.position.set(6, 2, -1)
cube1.castShadow = true
scene.add(cube1)

const cube2 = new THREE.Mesh(cubeGeometry, eyeMaterial)
cube2.position.set(6, 2, 1)
cube2.castShadow = true
scene.add(cube2)

const cube3 = new THREE.Mesh(cubeGeometry, eyeMaterial)
cube3.position.set(6, -2, 1)
cube3.castShadow = true
scene.add(cube3)

const cube4 = new THREE.Mesh(cubeGeometry, eyeMaterial)
cube4.position.set(6, -2, -1)
cube4.castShadow = true
scene.add(cube4)

const cube5 = new THREE.Mesh(longGeometry, eyeMaterial)
cube5.position.set(8, -2, 0)
cube5.castShadow = true
scene.add(cube5)


/***********
** LIGHTS **
************/
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//      new THREE.Color('white')
//)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20,4.1,0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048


// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

const composer = new EffectComposer( renderer );
	composer.addPass( new RenderPass( scene, camera ) );

	const colorShader = {
		uniforms: {
			tDiffuse: { value: null },
			color: { value: new THREE.Color( 0x88CCFF ) },
		},
		vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `,
		fragmentShader: `
      uniform vec3 color;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        vec4 previousPassColor = texture2D(tDiffuse, vUv);
        gl_FragColor = vec4(
            previousPassColor.rgb * color,
            previousPassColor.a);
      }
    `,
	};

	const colorPass = new ShaderPass( colorShader );
	composer.addPass( colorPass );

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')

  
	ui.add( colorPass.uniforms.color.value, 'r', 0, 4 ).name( 'red' );
	ui.add( colorPass.uniforms.color.value, 'g', 0, 4 ).name( 'green' );
	ui.add( colorPass.uniforms.color.value, 'b', 0, 4 ).name( 'blue' );


/********************
 ** ANIMATION LOOP ** 
 ********************/
const clock = new THREE.Clock()
let then = 0;
const animation = (now) =>
{
    now *= 0.001; // convert to seconds
		const deltaTime = now - then;
		then = now;
    // Return elapsedtime
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    //.rotation.y = elapsedTime

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()
    composer.render( deltaTime );
    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)

}

animation()






