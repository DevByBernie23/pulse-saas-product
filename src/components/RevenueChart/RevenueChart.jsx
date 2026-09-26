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
import { useWorkspace } from '../../../../context/WorkspaceContext';


const RevenueChart = () => {

  const { workspace} = useWorkspace()
  const [dateRange, setDateRange] = useState('30')
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRevenue = async () => {
      if (!workspace) {
        setLoading(false)
  return;
}
      

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/orders?workspaceId=${workspace.id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }

        const orders = await response.json();

const completedOrders = orders.filter(
  (order) => order.status === 'Completed'
);

const orderDates = completedOrders.map(
  (order) => new Date(order.date)
);

const latestOrderDate = new Date(
  Math.max(...orderDates)
);

const filteredOrders = completedOrders.filter((order) => {
  const orderDate = new Date(order.date);

  if (dateRange === '30') {
    const thirtyDaysAgo = new Date(latestOrderDate);
    thirtyDaysAgo.setDate(latestOrderDate.getDate() - 30);

    return orderDate >= thirtyDaysAgo && orderDate <= latestOrderDate;
  }

  if (dateRange === '90') {
    const ninetyDaysAgo = new Date(latestOrderDate);
    ninetyDaysAgo.setDate(latestOrderDate.getDate() - 90);

    return orderDate >= ninetyDaysAgo && orderDate <= latestOrderDate;
  }

  if (dateRange === 'year') {
    return orderDate.getFullYear() === latestOrderDate.getFullYear();
  }

  return true;
});

const revenueByDate = filteredOrders.reduce((acc, order) => {
  if (!acc[order.date]) {
    acc[order.date] = 0;
  }

  acc[order.date] += order.amount;

  return acc;
}, {});
        const charData = Object.entries(revenueByDate).map(
          ([date, revenue]) => ({
            date, revenue
          })
        )

        setRevenueData(charData);
      } catch (error) {
        console.error('Revenue error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRevenue();
  }, [workspace, dateRange]);

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
        <p>This project uses JSON Server as a mock backend, so the full API-driven functionality is available when running the project locally.</p>
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

        <select 
        value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}>
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