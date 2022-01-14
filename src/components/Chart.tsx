import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IChart } from './interfaces';
import './styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ dates, chartData }: IChart): ReactElement => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Clicks',
        yAxisID: 'y',
        data: chartData.clicks,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Impressions',
        yAxisID: 'y1',
        data: chartData.impressions,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Grid container item>
      <Typography variant="h5" className="header">
        Datasource: "Doubleclick (dfa) and Metrics"
      </Typography>
      <Line options={options} data={data} />
    </Grid>
  );
};

export default Chart;
