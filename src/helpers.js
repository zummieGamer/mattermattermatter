
import Matter from "matter-js";

export function HollowCircle(x, y, radius, segments = 64) {
    const bodies = [];
    const thickness = 15;

    // Calculate the length of each segment along the circumference
    const segmentWidth = (2 * Math.PI * radius / segments) * 1.05;

    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;

        const segment = Matter.Bodies.rectangle(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius,
            segmentWidth,
            thickness,
            {
                isStatic: true,
                angle: angle + Math.PI / 2,
                friction: 0,
                restitution: 0.9,
                render: {
                    fillStyle: "#ffffff"
                }
            }
        );

        bodies.push(segment);
    }

    return bodies;
}
