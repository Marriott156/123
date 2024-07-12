import testData from "./TestData";
import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  PointElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";
import { parseToRgb, rgb } from "polished";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  TimeScale,
  annotationPlugin,
  PointElement,
  zoomPlugin
);

interface CustomTooltip extends TooltipPositionerMap {
  custom: any;
}

interface StackData {
  Stack: string;
  LastDate: Date;
}

const labels = [...new Set(testData.map((event) => event.EventSource))];

const eventNames = [...new Set(testData.map((event) => event.EventName))];
const labelGrouping: StackData[][] = [];

interface GrNTTCHArtProps {
  minsetDate?: Date;
  maxsetDate?: Date;
}

const GrNTTCHArt: FC<GrNTTCHArtProps> = ({ minsetDate, maxsetDate }) => {
  const today = new Date().getTime();
  const minTime = Math.min(...testData.map((event) => event.Start.getTime()));
  const maxTime = Math.max(...testData.map((event) => event.End.getTime()));
  const threeMonthsInMillis = 1000 * 60 * 60 * 24 * 90;
  const isGraphBigger3Month = (today: number, time: number, isMin: boolean) => {
    if (isMin) {
      return today > time ? true : false;
    } else {
      return today + threeMonthsInMillis < time ? true : false;
    }
  };

  const createAnnotation = (color: string, groupIndex: number) => {
    const addTransparency = (color: string, alpha: number) => {
      const { red, green, blue } = parseToRgb(color);
      return `rgba(${red},${green},${blue},${alpha})`;
    };

    const transparentColor = addTransparency(color, 0.4);
    const groupHeight = 1;

    let yMin, yMax;

    if (groupIndex === 0) {
      yMin = -0.5;
      yMax = 0.5;
    } else {
      const previousGroup = uniqueGroups[groupIndex - 1];
      const previousAnnotationKey = `annotation_${previousGroup}`;
      const previousAnnotation = annotations[previousAnnotationKey];

      if (previousAnnotation) {
        yMin = previousAnnotation.yMax || 0; // Используем yMax предыдущей аннотации или 0
        yMax = yMin + groupHeight;
      } else {
        // Если нет предыдущей аннотации, установим значения по умолчанию
        yMin = -0.5;
        yMax = 0.5;
      }
    }

    return {
      type: "box",
      backgroundColor: transparentColor,
      borderWidth: 0,
      // xMin: setDate
      //   ? setDate.getTime() - threeMonthsInMillis
      //   : isGraphBigger3Month(today, minTime, true)
      //   ? minTime
      //   : today,
      // xMax: setDate
      //   ? setDate.getTime() + threeMonthsInMillis * 2
      //   : isGraphBigger3Month(today, minTime, false)
      //   ? maxTime
      //   : today + threeMonthsInMillis,
      xMin: minsetDate
        ? minsetDate.getTime() - threeMonthsInMillis
        : isGraphBigger3Month(today, minTime, true)
        ? minTime
        : today,
      xMax: maxsetDate
        ? maxsetDate.getTime() + threeMonthsInMillis * 2
        : isGraphBigger3Month(today, minTime, false)
        ? maxTime
        : today + threeMonthsInMillis,

      yMin: yMin,
      yMax: yMax,
      xScaleID: "x",
      yScaleID: "y",
      drawTime: "beforeDatasetsDraw",
    };
  };

  const uniqueGroups = [...new Set(testData.map((event) => event.EventSource))];
  const groupColors = uniqueGroups.map((group) => {
    const event = testData.find((event) => event.EventSource === group);
    return event ? event.color : "#000000";
  });

  const annotations: Record<string, Chart.AnnotationBox> = {};
  uniqueGroups.forEach((group, index) => {
    annotations[`annotation_${group}`] = createAnnotation(
      groupColors[index],
      index
    );
  });

  const datasets = testData.map((event) => {
    const start = event.Start.getTime();
    const end = event.End.getTime();

    const data = labels.map(() => null);
    data[labels.indexOf(event.EventSource)] = [
      start,
      end,
      event.Start + " - " + event.End,
    ];

    return {
      label: event.EventName,
      data: data,
      skipNull: true,
      backgroundColor: event.color,
      categoryPercentage: 0.7,
      barPercentage: 0.7,
      datalabels: {
        formatter: () => event.EventName,
      },
    };
  });

  const data = {
    labels,
    datasets: datasets,
  };

  // console.log(today + 1000 * 60 * 60 * 24 * 90, maxTime);
  const chartOptions: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          speed: 1,
          mode: "yx",
          modifierKey: null,
        },
        limits: {
          x: {
            // min: setDate
            //   ? setDate.getTime() - threeMonthsInMillis
            //   : isGraphBigger3Month(today, minTime, true)
            //   ? minTime
            //   : today,
            // max: setDate
            //   ? setDate.getTime() + threeMonthsInMillis * 2
            //   : isGraphBigger3Month(today, minTime, false)
            //   ? maxTime
            //   : today + threeMonthsInMillis,
            min: minsetDate
              ? minsetDate.getTime() - threeMonthsInMillis
              : isGraphBigger3Month(today, minTime, true)
              ? minTime
              : today,
            max: maxsetDate
              ? maxsetDate.getTime() + threeMonthsInMillis * 2
              : isGraphBigger3Month(today, minTime, false)
              ? maxTime
              : today + threeMonthsInMillis,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: () => "",
          afterBody: (items) =>
            data.datasets[items[0].datasetIndex].data[items[0].dataIndex][2],
          label: (item) => data.datasets[item.datasetIndex].label,
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Timeline",
      },
      datalabels: {
        categoryBackgroundColors: "red",
        color: "black",
        anchor: "start",
        align: "right",
        clip: true,
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== null
            ? "auto"
            : false;
        },
        font: function (context) {
          var width = context.chart.width;
          var maxSize = 20;
          var size = width / 140;
          size = Math.min(size, maxSize);

          return {
            weight: "bold",
            size: size,
          };
        },
      },
      annotation: {
        annotations: annotations,
      },
    },
    resizeDelay: 20,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        position: "top",
        // min: setDate ? setDate.getTime() : today,
        // max: setDate
        //   ? setDate.getTime() + threeMonthsInMillis
        //   : today + threeMonthsInMillis,
        min: minsetDate ? minsetDate.getTime() : today,
        max: maxsetDate ? maxsetDate.getTime() : today + threeMonthsInMillis,
        ticks: {
          autoSkip: true,
          maxTicksLimit:
            minsetDate && maxsetDate
              ? Math.round(
                  (maxsetDate.getTime() - minsetDate.getTime()) /
                    (1000 * 60 * 60 * 24 * 7)
                )
              : 13,
          minRotation: 0,
          maxRotation: 0,
          font: {
            size: 20,
            weight: "bold",
            family: "Arial",
          },
        },
        type: "time",
        time: {
          displayFormats: {
            day: "dd",
          },
          unit: "day",
        },
        stacked: false,
      },
      x2: {
        position: "top",
        // min: setDate ? setDate.getTime() : today,
        // max: setDate
        //   ? setDate.getTime() + threeMonthsInMillis
        //   : today + threeMonthsInMillis,
        min: minsetDate ? minsetDate.getTime() : today,
        max: maxsetDate ? maxsetDate.getTime() : today + threeMonthsInMillis,
        ticks: {
          autoSkip: true,
          maxTicksLimit:
            minsetDate && maxsetDate
              ? Math.round(
                  (maxsetDate.getTime() - minsetDate.getTime()) /
                    (1000 * 60 * 60 * 24 * 30)
                )
              : 3,
          minRotation: 0,
          maxRotation: 0,
          font: {
            size: 20,
            weight: "bold",
            family: "Arial",
          },
        },
        type: "time",
        time: {
          displayFormats: {
            month: "MMM",
          },
          unit: "month",
        },
        stacked: false,
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 7,
        stacked: false,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        overflowY: "auto",
      }}
    >
      <Bar options={chartOptions} data={data} />
    </div>
  );
};

export default GrNTTCHArt;
