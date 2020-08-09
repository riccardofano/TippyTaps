import { useMemo, useEffect, useState, useContext } from "react";
import { Line, Bar, defaults } from "react-chartjs-2";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);

import { UserContext, IScore, StateContext } from "../utils/types";
import { getScores } from "../utils/db/collections";
import styled from "styled-components";

interface ChartProps {
  lessonId: string;
}

const ChartContainer = styled.div`
  height: 300px;
`;

export default function Chart({ lessonId }: ChartProps) {
  const { user } = useContext(UserContext);
  const { uploaded } = useContext(StateContext);
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

  const lineData = useMemo(
    () => ({
      labels: timeStampDates,
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
    }),
    [scores]
  );

  const barData = useMemo(
    () => ({
      labels: timeStampDates,
      datasets: [
        {
          label: "Words per minute",
          data: results.wpmData,
          backgroundColor: "rgba(75, 168, 236, 0.3",
          hoverBackgroundColor: "rgba(75, 168, 236, 0.6",
        },
      ],
    }),
    [scores]
  );

  defaults.global.defaultFontFamily = "'Rubik', sans-serif";
  defaults.global.defaultFontSize = 16;
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
          <ChartContainer>
            <Line data={lineData} options={options} />
          </ChartContainer>
          <ChartContainer>
            <Bar data={barData} options={options} />
          </ChartContainer>
        </>
      ) : (
        <p>Log in to upload your scores</p>
      )}
    </div>
  );
}
