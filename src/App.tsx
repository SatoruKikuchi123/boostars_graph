import React, {useRef} from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS, ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import {Chart} from 'react-chartjs-2';
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

export function App() {
    const chartRef: React.MutableRefObject<any> = useRef()

    const options: ChartOptions<'bar'> = {
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
                font: {
                    size: 48,
                },
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    // color:'rgb(206, 239, 233)',
                }
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                }
            },
        },
    };

    const labels = ['MSカンパニー', 'TCカンパニー', 'CVカンパニー'];

    const data:ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: '月0回',
                data: [10, 20, 30],
                borderColor: 'rgb(206, 239, 233)',
                backgroundColor: 'rgba(206,239,233,0.5)',
                datalabels: {
                    // labels: {
                    //     title: null
                    // },
                    color: '#FF0000',
                }
            },
            {
                label: '月1回以上',
                data: [50, 50, 45],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                datalabels: {
                    color: '#0000FF',
                }
            },
            {
                label: '合計',
                data: [0, 0, 0],
                borderColor: 'rgb(0,255,13)',
                backgroundColor: 'rgb(0,255,13)',
                datalabels: {
                    formatter: (value: number, context: any) => {
                        const datasets = context.chart.data.datasets;
                        return datasets.reduce((acc: number, dataset: any) => acc + dataset.data[context.dataIndex], 0);
                    },
                    anchor: 'end',
                    align: 'right',
                    color: '#00ff0d',
                }
            },
        ],
    };

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const handleChangeData = () => {
        let data1: number[] = [];
        let data2: number[] = [];
        for (let i = 0; i < labels.length; i++) {
            data1.push(getRandomInt(30));
            data2.push(getRandomInt(50));
        }
        // ref.currentでchartの参照にアクセスできる
        chartRef.current.data.datasets[0].data = data1;
        chartRef.current.data.datasets[1].data = data2;

        chartRef.current.update(); // update()を呼ぶと再レンダリングする
    }
    return (
        <>
            <Chart ref={chartRef} type={'bar'} options={options} data={data}/>
            <button onClick={handleChangeData}>change data</button>
        </>
    )
}
