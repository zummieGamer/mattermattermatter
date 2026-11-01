// everytime the ball hits the circle the circle loses a segment

import Matter from "matter-js";
import { HollowCircle } from "../helpers.js";

export function start(engine) {
  const { Bodies, Composite } = Matter;

  let bounces = 1;
  let segments = 64;

  let circle = HollowCircle(540, 990, 250, segments);
  Matter.Composite.add(engine.world, circle);

  engine.gravity.y = 0;
  engine.gravity.x = 0;

  const ball = Bodies.circle(
    540,
    990,
    24,
    {
      restitution: 1,       // Perfectly elastic bounce
      friction: 0,         // No surface friction
      frictionStatic: 0,   // No static friction
      frictionAir: 0,      // No air resistance
      density: 0.001,
      render: {
          fillStyle: "#38bdf8"
      }
    }
  );

  Matter.Body.setVelocity(ball, {
    x: Math.random() * 5 + 5,
    y: Math.random() * 5 + 5,
  });

  Matter.Events.on(engine, "collisionStart", (event) => {
    for (const pair of event.pairs) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      if (bodyA.label) {
        if (bodyA.label === "circle_part") {
          segments -= 1
          Matter.Composite.remove(engine.world, circle)
          circle = HollowCircle(540, 990, 250, segments);
          Matter.Composite.add(engine.world, circle);
        }
      }

      if (bodyB.label) {
        if (bodyB.label === "circle_part") {
          segments -= 1
          Matter.Composite.remove(engine.world, circle)
          circle = HollowCircle(540, 990, 250, segments);
          Matter.Composite.add(engine.world, circle);
        }
      }
    }
  });

  Composite.add(engine.world, ball);
}