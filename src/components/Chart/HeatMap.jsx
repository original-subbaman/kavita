import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
// Generate dates for the past year
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 31; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const HeatmapChart = () => {
  // Generate random contribution data
  const generateContributionData = (dates) => {
    const series = dates.map((date) => {
      return {
        x: date,
        y: Math.floor(Math.random() * 5),
      };
    });
    return series;
  };

  const [dates] = useState(generateDates());
  const [series, setSeries] = useState([
    {
      name: "Week 1",
      data: generateContributionData(dates),
    },
    {
      name: "Week 2",
      data: generateContributionData(dates),
    },
    {
      name: "Week 3",
      data: generateContributionData(dates),
    },
    {
      name: "Week 4",
      data: generateContributionData(dates),
    },
    {
      name: "Week 5",
      data: generateContributionData(dates),
    },
    {
      name: "Week 6",
      data: generateContributionData(dates),
    },
    {
      name: "Week 7",
      data: generateContributionData(dates),
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#9BE9A8"],
    title: {
      text: "Contribution Activity",
      style: {
        color: "#FFFFFF",
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const date = w.globals.seriesX[seriesIndex][dataPointIndex];

        // Format the date for display in tooltip
        const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        };

        const formattedDate = formatDate(date);

        return `<div class="custom-tooltip">
          <span>${value} contribution${
          value !== 1 ? "s" : ""
        } on ${formattedDate}</span>
        </div>`;
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM",
        style: {
          fontSize: "12px",
          colors: "#FFFFFF",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: "#EBEDF0",
              name: "no contributions",
            },
            {
              from: 1,
              to: 1,
              color: "#9BE9A8",
              name: "low",
            },
            {
              from: 2,
              to: 2,
              color: "#40C463",
              name: "medium",
            },
            {
              from: 3,
              to: 3,
              color: "#30A14E",
              name: "high",
            },
            {
              from: 4,
              to: 4,
              color: "#216E39",
              name: "very high",
            },
          ],
        },
        enableShades: false,
        radius: 2,
        useFillColorAsStroke: true,
        distributed: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
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
    <div id="github-style-heatmap">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default HeatmapChart;
