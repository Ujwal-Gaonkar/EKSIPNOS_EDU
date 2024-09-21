import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { fetchUserAnalytics } from '@/services/admin'; // Fetch user analytics
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

const UserAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);

  useEffect(() => {
    fetchUserAnalytics()
      .then((response) => {
        setAnalytics(response.data.analytics);
      })
      .catch((err) => {
        console.error('Error fetching user analytics:', err);
      });
  }, []);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  // Prepare the data for the curved line chart
  const chartData = {
    labels: ['Total Users', 'Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'User Statistics',
        data: [analytics.totalUsers, analytics.activeUsers, analytics.inactiveUsers],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Gradient-like fill
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.4, // Smooth curve tension
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of points
        pointBorderWidth: 2, // Point border thickness
      },
    ],
  };

  // Chart options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend for a cleaner look
      },
      title: {
        display: true,
        text: 'User Analytics Overview',
        font: {
          size: 18,
          weight: 'bold' as 'normal' | 'bold' | 'bolder' | 'lighter' | number, // Correct the typing
        },
        color: '#333333', // Title color
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the Y-axis starts at 0
        ticks: {
          color: '#333333', // Y-axis tick color
        },
        grid: {
          color: '#e0e0e0', // Grid line color
        },
      },
      x: {
        ticks: {
          color: '#333333', // X-axis tick color
        },
        grid: {
          display: false, // Remove grid lines on X-axis
        },
      },
    },
  };

  return (
    <div className="flex">
      <Sidebar activePage="user-analytics" />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-black">User Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{analytics.totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{analytics.activeUsers}</h2>
            <p>Active Users</p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{analytics.inactiveUsers}</h2>
            <p>Inactive Users</p>
          </div>
        </div>

        {/* Add the curved line chart */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
