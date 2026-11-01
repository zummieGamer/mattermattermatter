// everytime the ball hits the circle the circle loses a segment

import Matter from "matter-js";
import { HollowCircle } from "../helpers.js";

export function start(engine) {
  const { Bodies, Composite } = Matter;

  let bounces = 1
  let segments = 24

  const circle = HollowCircle(540, 990, 350, segments);
  Matter.Composite.add(engine.world, circle);


  const ball = Bodies.circle(
    540,
    990,
    24,

    {
      restitution: 1,
      render: {
        fillStyle: "#38bdf8"
      }
    }
  );

  Composite.add(engine.world, ball);
}