import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Charts = ({ amount }) => {
  const options = {
    credits: false,
    chart: {
      backgroundColor: "#000000",
      style: {
        color: "#ffffff", // Set text color for the chart
      },
    },
    plotOptions: {
      column: {
        pointWidth: 30,
        dataLabels: {
          enabled: false,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        title: null,
        type: "column",
        data: amount,
        color: "#F0C3F1",
        showInLegend: false,
      },
    ],
    yAxis: {
      title: {
        text: "Amount in Rupee",
        style: {
          color: "white",
        },
        formatter: function () {
          return <FaIndianRupeeSign />;
        },
      },
      gridLineWidth: 0,
      plotLines: [
        {
          color: "#808080",
          width: 2,
          value: 0,
          zIndex: 5,
        },
      ],
      labels: {
        style: {
          color: "white",
        },
      },
    },
    title: {
      text: null,
    },
    xAxis: {
      title: null,
      lineWidth: 2,
      labels: {
        style: {
          color: "white",
        },
      },
      // plotLines: [
      //   {
      //     color: "#808080",
      //     width: 2,
      //     value: 0,
      //     zIndex: 5,
      //   },
      // ],
      categories: [
        "Custom",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
      ],
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default Charts;
