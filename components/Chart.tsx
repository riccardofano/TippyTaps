import { useEffect, useState, useContext } from "react";
import { Line, Bar, defaults } from "react-chartjs-2";
import styled, { ThemeContext } from "styled-components";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

import { UserContext, IScore, StateContext } from "../utils/types";
import { getScores } from "../utils/db/collections";
import { querySize } from "../utils/useMedia";

interface ChartProps {
  lessonId: string;
}

const ChartContainer = styled.div`
  height: 300px;

  @media ${querySize.medium} {
    height: 400px;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.mobile.h2};
  font-weight: 400;
  margin: 2rem 0 1rem;

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.h2};
    margin: 3rem 0 1.5rem;
  }
`;

export default function Chart({ lessonId }: ChartProps) {
  const { user } = useContext(UserContext);
  const { uploaded } = useContext(StateContext);
  const theme = useContext(ThemeContext);
  const [scores, setScores] = useState<IScore[]>([]);

  useEffect(() => {
    if (user && uploaded) {
      getScores({ userId: user.id, lessonId }).then((userScores) => {
        setScores(userScores);
      });
    }
  }, [user, uploaded]);

  const results = scores
    ? {
        timestamps: scores.map((score) => score.timestamp).slice(-5),
        accuracyData: scores.map((score) => score.accuracy).slice(-5),
        realAccuracyData: scores.map((score) => score.realAccuracy).slice(-5),
        wpmData: scores.map((score) => score.wpm).slice(-5),
      }
    : { timestamps: [], accuracyData: [], realAccuracyData: [], wpmData: [] };
  const timeStampDates = results.timestamps.map((time) =>
    dayjs(time).format("LT")
  );

  const lineData = {
    labels: timeStampDates,
    scaleFontColor: "#fff",
    datasets: [
      {
        label: "Accuracy",
        data: results.accuracyData,
        borderColor: "rgba(15, 87, 194, 0.6)",
        backgroundColor: "rgba(75, 168, 236, 0.3)",
      },
      {
        label: "Real Accuracy",
        data: results.realAccuracyData,
        borderColor: "rgba(15, 87, 194, 0.6)",
        backgroundColor: "rgba(75, 168, 236, 0.3)",
      },
    ],
  };

  const barData = {
    labels: timeStampDates,
    datasets: [
      {
        label: "Words per minute",
        data: results.wpmData,
        backgroundColor: "rgba(75, 168, 236, 0.3",
        hoverBackgroundColor: "rgba(75, 168, 236, 0.6",
      },
    ],
  };

  defaults.global.defaultFontFamily = "'Rubik', sans-serif";
  defaults.global.defaultFontSize = 16;
  defaults.global.defaultFontColor = theme.colors.text.main;

  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        padding: 20,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 6,
          },
        },
      ],
    },
  };

  return (
    <div>
      {user ? (
        <>
          <SectionHeader>Previous results</SectionHeader>
          <ChartContainer>
            <Line data={lineData} options={options} redraw />
          </ChartContainer>
          <ChartContainer>
            <Bar data={barData} options={options} redraw />
          </ChartContainer>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Log in to upload your scores</p>
      )}
    </div>
  );
}
