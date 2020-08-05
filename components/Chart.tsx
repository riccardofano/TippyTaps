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
      // TODO: check if the new score was uploaded first
      getScores({ userId: user.id, lessonId }).then((userScores) => {
        setScores(userScores);
      });
    }
  }, [user, uploaded]);

  const timestamps = scores.map((score) => score.timestamp);
  const accuracyData = scores.map((score) => score.accuracy);
  const realAccuracyData = scores.map((score) => score.realAccuracy);
  const wpmData = scores.map((score) => score.wpm);

  const timeStampDates = timestamps.map((time) => dayjs(time).fromNow());

  const lineData = useMemo(
    () => ({
      labels: timeStampDates,
      datasets: [
        { label: "Accuracy", data: accuracyData },
        { label: "Real Accuracy", data: realAccuracyData },
      ],
    }),
    [scores]
  );

  const barData = useMemo(
    () => ({
      labels: timeStampDates,
      datasets: [{ label: "Words per minute", data: wpmData }],
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
      <Line height={50} data={lineData} options={options} />
      <Bar height={50} data={barData} options={options} />
    </div>
  );
}
