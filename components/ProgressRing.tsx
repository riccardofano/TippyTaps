import styled from "styled-components";
import { useEffect, useState } from "react";
import { querySize, useMedia } from "../utils/useMedia";

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
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms ease-in;
`;

interface LessonRingProps {
  progress: number;
  number: number | string;
  large?: boolean;
}

export default function LessonRing({
  progress,
  number,
  large,
}: LessonRingProps) {
  const [currentProgress, setCurrentProgress] = useState(0);

  const radius = large
    ? useMedia(
        [querySize.large, querySize.medium, querySize.small],
        [70, 70, 40],
        40
      )
    : 40;

  const stroke = radius === 40 ? 7 : 10;
  const animationDelay = 300;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (currentProgress / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(
      () => setCurrentProgress(progress),
      animationDelay
    );
    return () => clearTimeout(timeout);
  });

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
          progress={currentProgress}
        />
      )}
      <text
        x={radius}
        y={radius * 1.17}
        fill="#000"
        fontFamily={"Rubik"}
        fontSize={radius === 40 ? "22px" : "36px"}
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
