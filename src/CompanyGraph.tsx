import React, {useEffect, useRef, useState} from 'react';
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
import {DivisionGraph} from "./DivisionGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

export function CompanyGraph() {
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

    const totalCompanyLabels = ['MSカンパニー', 'TCカンパニー', 'CVカンパニー'];
    const msCompanyLabels = ['MS部1', 'MS部2', 'MS部3'];
    const tcCompanyLabels = ['TC部1', 'TC部2'];
    const [companyLabels, setCompanyLabels] = useState(msCompanyLabels)


    const totalCompanyData: ChartData<'bar'> = {
        labels: totalCompanyLabels,
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
                },
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
    const msCompanyData: ChartData<'bar'> = {
        labels: msCompanyLabels,
        datasets: [
            {
                label: '月0回',
                data: [30, 20, 10],
                borderColor: 'rgb(206, 239, 233)',
                backgroundColor: 'rgba(206,239,233,0.5)',
                datalabels: {
                    color: '#FF0000',
                },
            },
            {
                label: '月1回以上',
                data: [10, 20, 35],
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
    const tcCompanyData: ChartData<'bar'> = {
        labels: tcCompanyLabels,
        datasets: [
            {
                label: '月0回',
                data: [20, 10],
                borderColor: 'rgb(225,135,115)',
                backgroundColor: 'rgba(225,135,115,0.5)',
                datalabels: {
                    color: '#FF0000',
                },
            },
            {
                label: '月1回以上',
                data: [5, 15],
                borderColor: 'rgb(176,231,131)',
                backgroundColor: 'rgba(176, 231, 131, 0.5)',
                datalabels: {
                    color: '#0000FF',
                }
            },
            {
                label: '合計',
                data: [0, 0],
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
    const [companyData, setCompanyData] = useState(msCompanyData)

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const changeData = () => {
        let data1: number[] = [];
        let data2: number[] = [];
        for (let i = 0; i < totalCompanyLabels.length; i++) {
            data1.push(getRandomInt(30));
            data2.push(getRandomInt(50));
        }
        // ref.currentでchartの参照にアクセスできる
        chartRef.current.data.datasets[0].data = data1;
        chartRef.current.data.datasets[1].data = data2;

        chartRef.current.update(); // update()を呼ぶと再レンダリングする
    }

    const changeDivisionGraph = (event: any) => {
        const {current: chart} = chartRef;

        if (!chart) {
            return;
        }

        const element: InteractionItem[] = getElementAtEvent(chart, event);
        console.log('element', element)
        if (!element.length) return;

        const {datasetIndex, index} = element[0];

        if (totalCompanyData.labels) {
            console.log(totalCompanyData.labels[index], totalCompanyData.datasets[datasetIndex].data[index]);
            if (totalCompanyData.labels[index] === 'MSカンパニー') {
                setCompanyData(msCompanyData)
                setCompanyLabels(msCompanyLabels)
            } else if (totalCompanyData.labels[index] === 'TCカンパニー') {
                setCompanyData(tcCompanyData)
                setCompanyLabels(tcCompanyLabels)
            }
        }
    }


    return (
        <>
            <Chart ref={chartRef} type={'bar'} options={options} data={totalCompanyData} onClick={changeDivisionGraph}/>
            <button onClick={changeData}>change data</button>
            <DivisionGraph companyLabels={companyLabels} companyData={companyData}/>
        </>
    )
}
