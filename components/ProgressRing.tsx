interface LessonRingProps {
  progress: number;
}

export default function LessonRing({ progress }: LessonRingProps) {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="rgba(0,0,0,0.15)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x={radius}
        y={radius + 9}
        fill="#000"
        fontWeight={700}
        fontFamily={"Rubik"}
        fontSize="24px"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        70
      </text>
    </svg>
  );
}
