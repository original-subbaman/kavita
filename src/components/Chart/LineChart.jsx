import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppTheme } from "../../hooks/useAppTheme";

const LineChart = ({ data }) => {
  const { mode } = useAppTheme();
  const isDark = mode === "dark";
  const textColor = isDark ? "#FFFFFF" : "#222222";
  const gridColor = isDark ? "#333" : "#e5e7eb";
  const lineColor = isDark ? "#9BE9A8" : "#F76B15";
  const [options, setOptions] = useState({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [lineColor],
    title: {
      text: "Your Activity This Month",
      style: {
        color: textColor,
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const value = w.config.series[seriesIndex].data[dataPointIndex].y;
        const date = w.config.series[seriesIndex].data[dataPointIndex].x;
        return `
          <div style="padding: 10px; background: ${
            isDark ? "#333" : "#fff"
          }; color: ${textColor}; border-radius: 5px;">
            <strong>Posted On: ${date}</strong><br />
            Post Count: <span style="font-size: 18px;">${value}</span>
          </div>
        `;
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: [textColor],
        },
      },
      axisBorder: {
        color: gridColor,
      },
      axisTicks: {
        color: gridColor,
      },
    },
    yaxis: {
      min: 0,
      max: 50,
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: [textColor],
        },
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      borderColor: gridColor,
      padding: {
        right: 20,
        left: 20,
        bottom: 15,
      },
    },
  });

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "Post Count", data: data }]}
      type="line"
      height={280}
    />
  );
};

export default LineChart;
