import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartInterface {
  dataWorld?: {
    Country: string;
    TotalConfirmed: number;
  }[];
  dataSearch?: {
    Date: string;
    Confirmed: number;
  }[];
  titleSearch?: {
    country: string;
    status: string;
  };
}

export default function LineChart({
  dataWorld,
  dataSearch,
  titleSearch,
}: LineChartInterface) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: dataWorld
          ? "Status Covid-19 of World"
          : `Status Covid-19 of ${titleSearch?.country.toUpperCase()} following ${
              titleSearch?.status
            }`,
      },
    },
  };

  const labels =
    dataWorld?.map(({ Country }) => Country) ||
    dataSearch?.map(({ Date }) => moment(Date).format("L"));

  const data = {
    labels,
    datasets: [
      {
        label: "Confirmed Cases",
        data:
          dataWorld?.map(({ TotalConfirmed }) => TotalConfirmed) ||
          dataSearch?.map(({ Confirmed }) => Confirmed),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
