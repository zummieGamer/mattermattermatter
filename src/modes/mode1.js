// everytime a ball is combined with a ball of its same type it is sent to the next type
// its buggy cuz its just a demo

import Matter from "matter-js";
import { HollowCircle } from "../helpers.js";

const spawn_rate = 0.1
// rate at which balls spawn (1 would spawn a ball every second.)

export function start(engine) {
  const { Bodies, Composite } = Matter;

  
  const colors = [
      { label: "Red", size: 24, color: "#f87171" },
      { label: "Green", size: 32, color: "#4ade80" },
      { label: "Blue", size: 45, color: "#38bdf8" },
      { label: "Purple", size: 60, color: "#7000ba" },
      { label: "Yellow", size: 90, color: "#ffe600" },
      { label: "Pink", size: 150, color: "#ba00ba" },
      { label: "Orange", size: 225, color: "#fb923c" },
      { label: "Cyan", size: 305, color: "#06b6d4" },
      { label: "Magenta", size: 380, color: "#d946ef" },
      { label: "Lime", size: 400, color: "#a3e635" },
      { label: "Coral", size: 450, color: "#ff7f50" },
  ];


  const circle = HollowCircle(540, 990, 450);
  Matter.Composite.add(engine.world, circle);

  setInterval(() => {
    const type = colors[Math.floor(Math.random()*3)]
    const ball = Bodies.circle(
        540,
        990,
        type.size,
        {
          label: type.label,
          restitution: 0.85,
          friction: 0.01,
          render: {
            fillStyle: type.color
          }
        }
      )

    Matter.Composite.add(engine.world, ball)
  }, spawn_rate*1000);

 
  Matter.Events.on(engine, "collisionStart", (event) => {
      const consumed = new Set();
      const merges = [];

      for (const pair of event.pairs) {
          const ball1 = pair.bodyA;
          const ball2 = pair.bodyB;

          // Ignore bodies that aren't balls
          if (ball1.label !== ball2.label) continue;

          // Don't process a ball more than once
          if (consumed.has(ball1) || consumed.has(ball2)) continue;

          // Find the ball type
          const index = colors.findIndex(
              type => type.label === ball1.label
          );

          // Ignore unknown labels and the final ball type
          if (index === -1 || index === colors.length - 1) continue;

          // Mark both balls as consumed
          consumed.add(ball1);
          consumed.add(ball2);

          // Queue the merge
          merges.push({
              x: (ball1.position.x + ball2.position.x) / 2,
              y: (ball1.position.y + ball2.position.y) / 2,
              nextType: colors[index + 1],
              ball1,
              ball2
          });
      }

      // Perform merges after checking all collision pairs
      for (const merge of merges) {
          Composite.remove(engine.world, merge.ball1);
          Composite.remove(engine.world, merge.ball2);

          const newBall = Bodies.circle(
              merge.x,
              merge.y,
              merge.nextType.size,
              {
                  label: merge.nextType.label,
                  restitution: 0.85,
                  friction: 0.01,
                  render: {
                      fillStyle: merge.nextType.color
                  }
              }
          );

          Composite.add(engine.world, newBall);
      }
  });
}

/* 
*/