import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { revenueData } from '../../../../data/data';
import './RevenueChart.css';

const RevenueChart = () => {
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