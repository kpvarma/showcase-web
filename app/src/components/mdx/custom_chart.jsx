// components/mdx/Custom_chart.js
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CustomChart = ({ data, labels }) => {
  // Memoize chart data and options for optimization
  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Monthly Performance',
        data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), [data, labels]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
  }), []);

  return <Bar data={chartData} options={options} />;
};

export default CustomChart;