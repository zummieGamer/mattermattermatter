import Matter from "matter-js";
import "./style.css";

// which mode 

import { start as mode1 } from "./modes/mode1.js";
import { start as mode2 } from "./modes/mode2.js";

const selectedMode = mode2;

// matter.js setup
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite
} = Matter;

// create da engine
const engine = Engine.create({
  positionIterations: 10, // resolve overlaps
  velocityIterations: 10, // resolve collisions and such
  constraintIterations: 2, // resolve connected objects

  enableSleeping: true // if an object is still it stops updating
});


engine.gravity.y = 1; // fall down (1) or up (-1)
engine.gravity.x = 0; // fall right (1) or left (-1)

engine.timing.timeScale = 1; // the speed of the engine (0.5 would be half speed) (pause with 0)


// RENDER
const render = Render.create({
  element: document.querySelector("#simulation"),
  engine: engine,
  options: {
    width: 1080,
    height: 1920,
    wireframes: false,
    background: "#111827",
    showSleeping: false // make sure that it isnt visible that the objects are sleeping
  }
});

// ===================================
// START SELECTED MODE
// ===================================

selectedMode(engine);

// ===================================
// START SIMULATION
// ===================================

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);