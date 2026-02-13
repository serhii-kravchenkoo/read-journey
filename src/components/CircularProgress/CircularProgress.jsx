import css from "./CircularProgress.module.css";

const CircularProgress = ({ size = 200, strokeWidth = 20, progress = 75 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      {/* фонове коло */}
      <circle
        className={css.bgCircle}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />

      {/* активна дуга */}
      <circle
        className={css.activeCircle}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round" // <-- дає округлені кінці
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // початок зверху
      />
    </svg>
  );
};

export default CircularProgress;