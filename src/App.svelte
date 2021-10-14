<script>
	import {
	  Canvas,
	  Scene,
	  PerspectiveCamera,
	  DirectionalLight,
	  AmbientLight,
	  PCFSoftShadowMap,
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
MeshPhongMaterial,
	} from "svelthree";
  
	import { sv3Ani } from "./animations.js";
	import { selectedGeom, sliderValue, startWithRandomRot } from "./stores.js";
  
	import Slider from "./Slider.svelte";
	import GeomSelector from "./GeomSelector.svelte";

	export let color = '#ff3e00';
	let income = 3;

	let w = 1;
	let h = 1;
	let d = 1;

	let house_w = 1;
	let house_h = 1;
	let house_d = 1;

	let food_w = 1;
	let food_h = 1;
	let food_d = 1;

	let entertainment_d = 1;
	let savings_d = 1;

	let income_change = income;

  let loader = new TextureLoader();
	let material = new MeshBasicMaterial({
  	map: loader.load('pngtree-vector-house.jpeg')
		});
	let cubeMaterial = new MeshBasicMaterial( material );

	let food_material = new MeshBasicMaterial({
  	map: loader.load('taco.jpeg')
		});
	let foodMaterial = new MeshBasicMaterial( food_material );

	let income_material = new MeshStandardMaterial();
	let incomeMaterial = new MeshStandardMaterial( income_material );

	let entertainment_material = new MeshBasicMaterial({
  	map: loader.load('taco.jpeg')
		});
	let entertainmentMaterial = new MeshBasicMaterial( entertainment_material );

	let savings_material = new MeshBasicMaterial({
  	map: loader.load('coin.png')
		});
	let savingsMaterial = new MeshBasicMaterial( savings_material );

	let cubeGeometry = new CubeGeometry();
	let floorGeometry = new PlaneBufferGeometry(10, 10, 1);
	let sphereGeometry = new SphereGeometry( income, 32, 32 );
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

	<Scene {sti} let:scene id="scene1" props={{ background: 0x0098DB }}>
  
	  <PerspectiveCamera {scene} id="cam1" pos={[3, 3, 3]} lookAt={[-12, 2, 0]} />
	  <AmbientLight {scene} intensity={1.25} />
	  <DirectionalLight {scene} pos={[3, 3, 3]} />
  
		<!-- hearth & home -->
    <Mesh
      {scene}
      geometry={cubeGeometry}
      material={cubeMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[-2, 0, -2]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,house_d]}
      receiveShadow />

						<!-- Food -->
    <Mesh
      {scene}
      geometry={cubeGeometry}
      material={foodMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[-2, 0, 2]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,food_d]}
      receiveShadow />

			<!-- Entertainment -->
			<Mesh
			{scene}
			geometry={cubeGeometry}
			material={entertainmentMaterial}
			mat={{ roughness: 0.5, metalness: 0.5 }}
			pos={[2, 0, 2]}
			rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,entertainment_d]}
			receiveShadow />

		<!-- savings -->
    <Mesh
      {scene}
      geometry={cubeGeometry}
      material={cubeMaterial}
      mat={{ roughness: 0.5, metalness: 0.5 }}
      pos={[2, 0, -2]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
			location={[0,h/2,0]}
			rotation={[0,-20,0]}
			scale={[w,h,savings_d]}
      receiveShadow />

			<!-- Income sphere -->
    <Mesh
      {scene}
      geometry={sphereGeometry}
      material={incomeMaterial}
      mat={{ metalness: 0.5, roughness: 0.1, diffuse: 0.1, color: 0xE5BA1B }}
      pos={[-12, 2, 0]}
      rot={[MathUtils.degToRad(-90), 0, 0]}
      scale={[income_change-( Math.abs(house_d) + Math.abs(food_d) ) , income_change-( Math.abs(house_d) + Math.abs(food_d) ) , income_change-( Math.abs(house_d) + Math.abs(food_d) ) ]}
      receiveShadow />

			<!-- floor -->
    <Mesh
      {scene}
      geometry={floorGeometry}
      material={floorMaterial}
      mat={{ roughness: 0.5, metalness: 0.2, side: DoubleSide, color: 0x2A2A2A }}
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
		<!-- <label>
			<input type="color" style="height: 40px" bind:value={color}>
		</label> -->
			<label>
			<input type="range" bind:value={income_change} min={0.1} max={5} step={0.1}> Treasure ({income_change})
		</label>

		<label>
			<input type="range" bind:value={food_d} min={0.1} max={5} step={0.1}> <input type="number" bind:value={food_d} inputmode="numeric"> Food Expenses
		</label>

		<label>
			<input type="range" bind:value={house_d} min={0.1} max={5} step={0.1}> <input type="number" bind:value={house_d} inputmode="numeric"> Home Expenses 
		</label>

		<label>
			<input type="range" bind:value={entertainment_d} min={0.1} max={5} step={0.1}> <input type="number" bind:value={entertainment_d} inputmode="numeric"> Entertainment Expenses
		</label>

		<label>
			<input type="range" bind:value={savings_d} min={0.1} max={5} step={0.1}> <input type="number" bind:value={savings_d} inputmode="numeric"> Savings 
		</label>

		<!-- <label>
			<input type="range" bind:value={w} min={0.1} max={5} step={0.1}> width ({w})
		</label>
	
		<label>
			<input type="range" bind:value={h} min={0.1} max={5} step={0.1}> height ({h})
		</label>
	
		<label>
			<input type="range" bind:value={d} min={0.1} max={5} step={0.1}> depth ({d})
		</label> -->
	</div>
	


	