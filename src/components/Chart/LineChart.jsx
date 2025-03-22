import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data }) => {
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
    colors: ["#9BE9A8"],
    title: {
      text: "Your Activity This Month",
      style: {
        color: "#FFFFFF",
      },
    },
    tooltip: {
      enabled: true, // Enable tooltip
      shared: false, // For single series, set to false
      followCursor: true, // Tooltip follows the cursor
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const value = w.config.series[seriesIndex].data[dataPointIndex].y; // Get value of the data point
        const date = w.config.series[seriesIndex].data[dataPointIndex].x; // Get corresponding date
        console.log("date", date);
        return `
          <div style="padding: 10px; background: #333; color: #fff; border-radius: 5px;">
            <strong>Posted On: ${date}</strong><br />
            Post Count: <span style="font-size: 18px;">${value}</span>
          </div>
        `;
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "#ffffff", // Set x-axis label color to white
        },
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
          colors: "#ffffff", // Set x-axis label color to white
        },
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
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
