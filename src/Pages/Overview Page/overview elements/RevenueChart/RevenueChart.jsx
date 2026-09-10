import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import './RevenueChart.css';
import { useEffect, useState } from 'react';

const RevenueChart = () => {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRevenue = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          'http://localhost:3000/revenueData'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch revenue data');
        }

        const data = await response.json();

        console.log('Revenue data:', data);

        setRevenueData(data);
      } catch (error) {
        console.error('Revenue error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRevenue();
  }, []);

  if (loading) {
    return (
      <section className="revenue-card">
        <h2>Loading revenue...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="revenue-card">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </section>
    );
  }
  if (revenueData.length === 0) {
  return (
    <section className="revenue-card">
      <h2>No revenue data</h2>
      <p>There is currently no revenue data to display.</p>
    </section>
  );
}

  return (
    <section className="revenue-card">

      <div className="revenue-header">
        <div>
          <h2>Revenue Overview</h2>
          <p>Track your revenue performance over time.</p>
        </div>

        <select>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [`$${value}`, 'Revenue']}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
};

export default RevenueChart;