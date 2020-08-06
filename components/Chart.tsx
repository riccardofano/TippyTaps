import { useMemo, useEffect, useState, useContext } from "react";
import { Line, Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserContext, IScore, StateContext } from "../utils/types";
import { getScores } from "../utils/db/collections";

dayjs.extend(relativeTime);

interface ChartProps {
  lessonId: string;
}

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
        timestamps: scores.map((score) => score.timestamp),
        accuracyData: scores.map((score) => score.accuracy),
        realAccuracyData: scores.map((score) => score.realAccuracy),
        wpmData: scores.map((score) => score.wpm),
      }
    : { timestamps: [], accuracyData: [], realAccuracyData: [], wpmData: [] };
  const timeStampDates = results.timestamps.map((time) =>
    dayjs(time).fromNow()
  );

  const lineData = useMemo(
    () => ({
      labels: timeStampDates,
      datasets: [
        { label: "Accuracy", data: results.accuracyData },
        { label: "Real Accuracy", data: results.realAccuracyData },
      ],
    }),
    [scores]
  );

  const barData = useMemo(
    () => ({
      labels: timeStampDates,
      datasets: [{ label: "Words per minute", data: results.wpmData }],
    }),
    [scores]
  );

  const options = useMemo(
    () => ({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }),
    []
  );

  return (
    <div>
      <Line data={lineData} options={options} />
      <Bar data={barData} options={options} />
    </div>
  );
}
