import React, {useEffect, useRef} from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS, ChartData,
    ChartOptions, InteractionItem,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import {Chart, getElementAtEvent} from 'react-chartjs-2';
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

interface DivisionGraphProps {
    companyLabels: string[]
    companyData: ChartData<'bar'>,
}

export function DivisionGraph({companyData, companyLabels}: DivisionGraphProps) {
    const chartRef: React.MutableRefObject<any> = useRef<ChartJS>()

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
                min: 0,
                max: 80,
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                }
            },
        },
    };

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const handleChangeData = () => {
        let data1: number[] = [];
        let data2: number[] = [];
        for (let i = 0; i < companyLabels.length; i++) {
            data1.push(getRandomInt(50));
            data2.push(getRandomInt(50));
        }
        // ref.currentでchartの参照にアクセスできる
        chartRef.current.data.datasets[0].data = data1;
        chartRef.current.data.datasets[1].data = data2;

        chartRef.current.update(); // update()を呼ぶと再レンダリングする
    }

    return (
        <>
            <Chart ref={chartRef} type={'bar'} options={options} data={companyData}/>
            <button onClick={handleChangeData}>change data</button>
        </>
    )
}
