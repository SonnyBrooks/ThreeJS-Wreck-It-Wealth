<script>
    import { sliderValue, selectedGeom, startWithRandomRot } from "./stores.js";
  
    let slider;
    let sliderMin = 1;
    let sliderMax = 100;
  
    $sliderValue = sliderMin;
  
    function resetScene() {
      $sliderValue = 0;
      requestAnimationFrame(() => ($sliderValue = sliderMin));
    }
  </script>
  
  <style>
    .slider-h2 {
      width: 500px;
      text-align: center;
    }
  
    .input-row {
      width: 500px;
      display: flex;
      justify-content: space-between;
    }
  
    .input-row-start {
      width: 6rem;
      justify-self: start;
    }
  
    .input-row-end {
      width: 6rem;
      justify-self: start;
    }
  
    .slider {
      width: 500px;
    }
  </style>
  
  <div>
    <h2 class="slider-h2">
      {$sliderValue}
      {$sliderValue > 1 ? $selectedGeom.txtMore : $selectedGeom.txtOne}
      {'!'.repeat(Math.floor($sliderValue / 150))}
    </h2>
  
    <div class="input-row">
      <input
        type="number"
        class="input-row-start"
        bind:value={sliderMin}
        on:change={resetScene} />
  
      <div style="width: 14rem;">
        <input
          type="checkbox"
          id="start_rot_check"
          name="start_rot"
          bind:checked={$startWithRandomRot}
          on:change={resetScene} />
        Start with random rotation
      </div>
  
      <input
        type="number"
        class="input-row-end"
        bind:value={sliderMax} />
    </div>
  
    <div class="slider">
      <input
        bind:this={slider}
        type="range"
        min={sliderMin}
        step="1"
        max={sliderMax}
        style="width:100%; height:3rem"
        bind:value={$sliderValue}
        id="myRange" />
    </div>
  </div>
  