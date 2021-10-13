<script>
    import { selectedGeom, geoms } from "./stores.js";
  
    $selectedGeom = $geoms[0];
  </script>
  
  <style>
    .selector {
      margin: 0.5rem 0.5rem 0.5rem 0;
      padding: 0.5rem 0.5rem 0.5rem 0;
    }
  </style>
  
  <select class="selector" bind:value={$selectedGeom}>
    {#each $geoms as geomItem}
      <option value={geomItem}>{geomItem.text}</option>
    {/each}
  </select>
  