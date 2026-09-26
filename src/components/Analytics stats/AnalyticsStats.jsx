import React from 'react';
import '../../Pages/Analytics Page/Analytics.css';
import { useState, useEffect } from 'react';
import StatCard from '../../Pages/Overview Page/overview elements/StatCard/StatCard';
import { useWorkspace } from '../../context/WorkspaceContext';

const AnalyticsStats = () => {
    const { workspace } = useWorkspace()
    const [analyticsStats, setAnalyticsStats] = useState([]);
  
    useEffect(() => {
  const getAnalyticsStats = async () => {
    if (!workspace) return;

    try {
      const [ordersResponse, customersResponse] = await Promise.all([
        fetch(`http://localhost:3000/orders?workspaceId=${workspace.id}`),
        fetch(`http://localhost:3000/customers?workspaceId=${workspace.id}`),
      ]);

      if (!ordersResponse.ok || !customersResponse.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const orders = await ordersResponse.json();
      const customers = await customersResponse.json();

      const completedOrders = orders.filter(
        (order) => order.status === 'Completed'
      );

      const totalRevenue = completedOrders.reduce(
        (total, order) => total + order.amount,
        0
      );

      const totalOrders = orders.length;
      const totalCustomers = customers.length;

      const averageOrderValue =
        completedOrders.length > 0
          ? totalRevenue / completedOrders.length
          : 0;

      setAnalyticsStats([
        {
          id: '1',
          title: 'Total Revenue',
          value: `$${totalRevenue.toLocaleString()}`,
          change: '',
        },
        {
          id: '2',
          title: 'Total Orders',
          value: totalOrders.toLocaleString(),
          change: '',
        },
        {
          id: '3',
          title: 'Total Customers',
          value: totalCustomers.toLocaleString(),
          change: '',
        },
        {
          id: '4',
          title: 'Average Order Value',
          value: `$${averageOrderValue.toFixed(2)}`,
          change: '',
        },
      ]);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  getAnalyticsStats();
}, [workspace]);
  return (
    <div>
        <section className="analytics-intro">
        <div>
          <h1>Analytics</h1>
          <p>
            Understand your business performance and growth trends.
          </p>
        </div>

        <select>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </section>
       <section className="analytics-stats">
  {analyticsStats.map((stat) => (
    <StatCard
      key={stat.id}
      stat={stat}
    />
  ))}
</section>
<div className="analytics-bottom">

  <section className="analytics-card">
    <h2>Customer Growth</h2>

    {/* Recharts */}
  </section>

  <section className="analytics-card">
    <h2>Performance Breakdown</h2>

    {/* breakdown */}
  </section>
  </div>
    </div>
  );
}

export default AnalyticsStats;
