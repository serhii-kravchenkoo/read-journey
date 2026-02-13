import css from "./RisingSpeedGraph.module.css";

export default function RisingSpeedGraph({
  width = 320,
  height = 140,
  speed = 10,
  maxSpeed = 100,
  isPhone,
}) {
 
  const clamped = Math.min(Math.max(speed, 0), maxSpeed);

  const rise = (clamped / maxSpeed) * (height * 0.7);

  const bottomLeft = [0, height];
  const bottomRight = [width, height];
  const topRight = [width, height - rise];
  const topLeft = [0, height - rise * 0.6];

  return (
    <svg width={width} height={height}>

      <polygon
        className={css.polygon}
        points={`
          ${bottomLeft} 
          ${bottomRight}
          ${topRight}
          ${topLeft}
        `}
          />
          
      <line
        className={css.line}
        x1={topLeft[0]}
        y1={topLeft[1]}
        x2={topRight[0]}
        y2={topRight[1]}
        strokeWidth={isPhone ? 2.18 : 3}
        strokeLinecap="round"
      />
    </svg>
  );
}