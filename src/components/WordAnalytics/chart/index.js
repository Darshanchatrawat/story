import { Line } from 'react-chartjs-2'
import { lineLegends } from '../../../utils/demo/chartsData';
import ChartLegend from '../../Chart/ChartLegend';
import ChartCard from '../../Chart/ChartCard'

let lineOptions = {
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'January',
                backgroundColor: '#0694a2',
                borderColor: '#0694a2',
                data: [43, 48, 40, 54, 67, 73, 70],
                fill: false,
            }
        ],
    },
    options: {
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            x: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month',
                },
            },
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value',
                },
            },
        },
        elements: {
            line: {
                tension: 0.3
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: false,
            },
        }
    },
}

const ChartWordAnalytics = () => {
    return <>
        <ChartCard title="Analytics">
            <Line {...lineOptions} />
            <ChartLegend legends={lineLegends} />
        </ChartCard>
    </>
};

export default ChartWordAnalytics;