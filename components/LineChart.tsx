import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function LineChart() {
  const timestamps = [
    1596629517962,
    1596629553288,
    1596630783292,
    1596641117575,
  ];
  const data = useMemo(
    () => ({
      labels: timestamps.map((time) => dayjs(time).fromNow()),
      datasets: [
        {
          label: "Accuracy",
          data: [89, 87, 97, 95],
        },
        {
          label: "Real Accuracy",
          data: [90, 100, 100, 97],
        },
      ],
    }),
    []
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

  return <Line data={data} options={options} />;
}
