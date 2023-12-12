import React, {MutableRefObject, useRef} from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
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

const options:ChartOptions<'bar'> = {
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
      formatter: (value: number, context: any) => {
        const datasets = context.chart.data.datasets;
        return datasets.reduce((acc: number, dataset: any) => acc + dataset.data[context.dataIndex], 0);
      },
      anchor:'end',
      align: 'right',
      font: {
        size: 48,
      },
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display:false
      },
      ticks: {
        // color:'rgb(206, 239, 233)',
      }
    },
    y: {
      stacked: true,
      grid: {
        display:false
      }
    },
  },
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
        labels: {
          title: null
        },
        color: '#FF0000',
      }
    },
    {
      label: '月1回以上',
      data: [50,50,45],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      datalabels: {
        color: '#0000FF',
      }
    },
  ],
};
// function getRandomInt(max:number) {
//   return Math.floor(Math.random() * max);
// }
// const chartRef:MutableRefObject<any | undefined> = useRef(undefined)
// const handleChangeData ():void => {
//   let data1: number[] = [];
//   let data2: number[] = [];
//   for (let i = 0; i < labels.length; i++) {
//     data1.push(getRandomInt(10));
//     data2.push(getRandomInt(100));
//   }
//
//   // ref.currentでchartの参照にアクセスできる
//   chartRef.current.data.datasets[0].data = data1;
//   chartRef.current.data.datasets[1].data = data2;
//
//   chartRef.current.update(); // update()を呼ぶと再レンダリングする
// }

export function App() {
  return　(
      <Bar options={options} data={data} />
      // <button onClick={handleChangeData}>data change</button>
  )
}
