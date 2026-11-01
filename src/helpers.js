
import Matter from "matter-js";

export function HollowCircle(x, y, radius, segments = 64) {
    const bodies = [];
    const thickness = 15;

    // Never allow fewer than 2 segments
    segments = Math.max(2, Math.floor(segments));

    const angleStep = (Math.PI * 2) / segments;

    // Calculate width so neighboring rectangle ends meet.
    // The extra 2% ensures a tiny overlap to prevent physics gaps.
    const segmentWidth = 2 * radius * Math.tan(angleStep / 2) * 1.02;

    for (let i = 0; i < segments; i++) {
        const rotationOffset = segments === 3 ? Math.PI / 2 : 0;
        const angle = i * angleStep + rotationOffset;

        const segment = Matter.Bodies.rectangle(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius,
            segmentWidth,
            thickness,
            {
                isStatic: true,
                label: "circle_part",
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
