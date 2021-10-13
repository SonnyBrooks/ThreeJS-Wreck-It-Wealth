import { readable, writable } from "svelte/store";

import {
  BoxBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  DodecahedronBufferGeometry,
} from "svelthree";

const cubeGeometry = new BoxBufferGeometry(1, 1, 1);
const coneGeometry = new ConeBufferGeometry(0.75, 1.25, 8);
const cylinderGeometry = new CylinderBufferGeometry(0.75, 0.75, 1, 8);
const docahGeometry = new DodecahedronBufferGeometry(0.8, 0);

export const geoms = new readable([
  {
    geom: cubeGeometry,
    text: "BoxBufferGeometry",
    txtOne: "Cube",
    txtMore: "Cubes",
  },
  {
    geom: coneGeometry,
    text: "ConeBufferGeometry",
    txtOne: "Cone",
    txtMore: "Cones",
  },
  {
    geom: cylinderGeometry,
    text: "CylinderBufferGeometry",
    txtOne: "Cylinder",
    txtMore: "Cylinders",
  },
  {
    geom: docahGeometry,
    text: "DodecahedronBufferGeometry",
    txtOne: "Dodecahedron",
    txtMore: "Dodecahedrons",
  },
]);

export const selectedGeom = new writable(0);
export const selectedMat = new writable({});
export const sliderValue = new writable(0);
export const startWithRandomRot = new writable(true);
