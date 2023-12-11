import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
    datalabels: {
      color: '#36A2EB',
      font: {
        size: 48,
      }
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    }
  },
  xAxes: [{
    display: true,
    gridLines: {
      display: false
    }
  }],
  yAxes: [{
    gridLines: {
      drawBorder: false
    }
  }]
};

const labels = ['MSカンパニー', 'TCカンパニー', 'CVカンパニー'];

const data = {
  labels,
  datasets: [
    {
      label: '月0回',
      data: [10,20,30],
      borderColor: 'rgb(206, 239, 233)',
      backgroundColor: 'rgba(206,239,233,0.5)',
      datalabels: {
        color: '#FF0000',
      }
    },
    {
      label: '月1回以上',
      data: [50,50,45],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      datalabels: {
        color: '#0000FF'
      }
    },
  ],
};

export function App() {
  return <Bar options={options} data={data} />;
}
