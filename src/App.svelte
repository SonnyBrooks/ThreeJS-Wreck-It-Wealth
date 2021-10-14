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
		SphereGeometry,
		CubeGeometry,
	} from "svelthree";
	// } from "svelthree";
  
	import { sv3Ani } from "./animations.js";
	import { selectedGeom, sliderValue, startWithRandomRot } from "./stores.js";
  
	import Slider from "./Slider.svelte";
	import GeomSelector from "./GeomSelector.svelte";

	export let color = '#ff3e00';
	let w = 1;
	let h = 1;
	let d = 1;

  let loader = new TextureLoader();
	let material = new MeshBasicMaterial({
  	map: loader.load('pngtree-vector-house.jpeg')
		});
	let cubeMaterial = new MeshBasicMaterial( material );
	let cubeGeometry = new CubeGeometry();
	let floorGeometry = new PlaneBufferGeometry(4, 4, 1);
	let sphereGeometry = new SphereGeometry();
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
  
  <Canvas let:sti w={1450} h={600} interactive>
  
	<Scene {sti} let:scene id="scene1" props={{ background: 0xedf2f7 }}>
  
	  <PerspectiveCamera {scene} id="cam1" pos={[0, 0, 3]} lookAt={[0, 0, 0]} />
	  <AmbientLight {scene} intensity={1.25} />
	  <DirectionalLight {scene} pos={[3, 3, 3]} />
  
    <Mesh
      {scene}
      geometry={cubeGeometry}
      material={cubeMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[0, 0, -2]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,d]}
      receiveShadow />

    <Mesh
      {scene}
      geometry={cubeGeometry}
      material={cubeMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[0, 0, 2]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,d]}
      receiveShadow />

    <Mesh
      {scene}
      geometry={sphereGeometry}
      material={cubeMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[0, 2, 0]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
      scale={[1, 1, 1]}
      receiveShadow />

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

  
	<div class="controls">
		<label>
			<input type="color" style="height: 40px" bind:value={color}>
		</label>
	
		<label>
			<input type="range" bind:value={w} min={0.1} max={5} step={0.1}> width ({w})
		</label>
	
		<label>
			<input type="range" bind:value={h} min={0.1} max={5} step={0.1}> height ({h})
		</label>
	
		<label>
			<input type="range" bind:value={d} min={0.1} max={5} step={0.1}> depth ({d})
		</label>
	</div>
	


	