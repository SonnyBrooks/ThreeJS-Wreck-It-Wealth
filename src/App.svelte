<script>
	import {
	  Canvas,
	  Scene,
	  PerspectiveCamera,
	  DirectionalLight,
	  AmbientLight,
	  BoxBufferGeometry,
	  Mesh,
	  MeshStandardMaterial,
		MeshBasicMaterial,
	  WebGLRenderer,
		PlaneBufferGeometry,
		OrbitControls,
		DoubleSide,
    MathUtils,
TextureLoader,
	} from "svelthree";
	// } from "svelthree";
  
	import { sv3Ani } from "./animations.js";
	import { selectedGeom, sliderValue, startWithRandomRot } from "./stores.js";
  
	import Slider from "./Slider.svelte";
	import GeomSelector from "./GeomSelector.svelte";
  let loader = new TextureLoader();
	let material = new MeshBasicMaterial({
  	map: loader.load('iroh.png')
		});
	let cubeMaterial = new MeshBasicMaterial( material );

	let floorGeometry = new PlaneBufferGeometry(4, 4, 1);
  let floorMaterial = new MeshStandardMaterial();
  
	// Reactive animation function generation
	let animateWithGSAPandRAF;
	$: animateWithGSAPandRAF = sv3Ani($startWithRandomRot);
  </script>
  
  <style>
	.selector-block {
	  width: 500px;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	  margin-bottom: 2rem;
	}
  </style>
  
  <div class="selector-block">
	<GeomSelector />
  </div>
  
  <Canvas let:sti w={500} h={500} interactive>
  
	<Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>
  
	  <PerspectiveCamera {scene} id="cam1" pos={[0, 0, 3]} lookAt={[0, 0, 0]} />
	  <AmbientLight {scene} intensity={1.25} />
	  <DirectionalLight {scene} pos={[3, 3, 3]} />
  
	  {#each Array($sliderValue) as _, i}
		<Mesh
		  {scene}
		  geometry={$selectedGeom.geom}
		  material={cubeMaterial}
		  mat={{ roughness: 0.5, metalness: 0.5, color: 0xff3e00 }}
		  pos={[0, 0, 0]}
		  rot={[0.5, 0.6, 0]}
		  scale={[0.6, 0.6, 0.6]}
		  aniauto />
	  {/each}

    <Mesh
      {scene}
      geometry={floorGeometry}
      material={floorMaterial}
      mat={{ roughness: 0.5, metalness: 0.5, side: DoubleSide, color: 0xf7fafc }}
      pos={[0, -0.501, 0]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
      scale={[1, 1, 1]}
      receiveShadow />

		<OrbitControls {scene} enableDamping />
	</Scene>
  
	<WebGLRenderer
	  {sti}
	  sceneId="scene1"
	  camId="cam1"
	  config={{ antialias: true, alpha: false }} />
  
  </Canvas>
  
  <Slider />
  


	