import { useMemo, useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserContext, IScore } from "../utils/types";
import { getScores } from "../utils/db/collections";

dayjs.extend(relativeTime);

interface LineChartProps {
  lessonId: string;
}

export default function LineChart({ lessonId }: LineChartProps) {
  const { user } = useContext(UserContext);
  const [scores, setScores] = useState<IScore[]>([]);

  useEffect(() => {
    if (user) {
      // TODO: check if the new score was uploaded first
      getScores({ userId: user.id, lessonId }).then((userScores) =>
        setScores(userScores)
      );
    }
  }, [user]);

  const timestamps = scores.map((score) => score.timestamp);
  const accuracyData = scores.map((score) => score.accuracy);
  const realAccuracyData = scores.map((score) => score.realAccuracy);
  const wpmData = scores.map((score) => score.wpm);

  const data = useMemo(
    () => ({
      labels: timestamps.map((time) => dayjs(time).fromNow()),
      datasets: [
        { label: "Accuracy", data: accuracyData },
        { label: "Real Accuracy", data: realAccuracyData },
      ],
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
      <Line height={50} data={data} options={options} />
    </div>
  );
}
