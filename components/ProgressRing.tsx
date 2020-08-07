import styled, { keyframes, css } from "styled-components";

interface BottomCircleProps {
  circleStroke: number;
  circumference: number;
  radius: number;
  normalizedRadius: number;
}

const BottomCircle = styled.circle.attrs<BottomCircleProps>(
  ({ radius, normalizedRadius }) => ({
    r: normalizedRadius,
    cx: radius,
    cy: radius,
  })
)<BottomCircleProps>`
  stroke-width: ${(props) => props.circleStroke};
  stroke: rgba(0, 0, 0, 0.15);
  fill: transparent;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const fillUp = (props: TopCircleProps) => keyframes`
  from { stroke-dashoffset: 162; }
  to { stroke-dashoffset: ${props.offset}; }
`;

interface TopCircleProps extends BottomCircleProps {
  offset: number;
  progress: number;
}

const TopCircle = styled(BottomCircle).attrs<TopCircleProps>(
  ({ offset, normalizedRadius, radius }) => ({
    style: { strokeDashoffset: offset },
    r: normalizedRadius,
    cx: radius,
    cy: radius,
  })
)<TopCircleProps>`
  stroke-width: ${(props) => props.circleStroke};
  stroke-dasharray: ${(props) =>
    props.circumference + " " + props.circumference};
  stroke: ${(props) =>
    props.progress === 100 ? "url(#gradientFull)" : "url(#gradient)"};
  animation: ${fillUp} 500ms ease-in;
  stroke-linecap: round;
`;

interface LessonRingProps {
  progress: number;
  number: number;
}

export default function LessonRing({ progress, number }: LessonRingProps) {
  const radius = 40;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <BottomCircle
        circleStroke={stroke}
        circumference={circumference}
        radius={radius}
        normalizedRadius={normalizedRadius}
      />
      {progress && (
        <TopCircle
          radius={radius}
          circleStroke={stroke}
          circumference={circumference}
          normalizedRadius={normalizedRadius}
          offset={strokeDashoffset}
          progress={progress}
        />
      )}
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
        {number}
      </text>
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#4ba8ec" />
          <stop offset="100%" stopColor="#0f57c2" />
        </linearGradient>
        <linearGradient id="gradientFull">
          <stop offset="0%" stopColor="#51cf8b" />
          <stop offset="100%" stopColor="#159859" />
        </linearGradient>
      </defs>
    </svg>
  );
}
