import React from 'react';
import '../../Pages/Analytics Page/Analytics.css'
import { useState, useEffect } from 'react';
import StatCard from '../../Pages/Overview Page/overview elements/StatCard/StatCard';

const AnalyticsStats = () => {

    const [analyticsStats, setAnalyticsStats] = useState([]);
  
    useEffect(() => {
      const getAnalyticsStats = async () => {
        const response = await fetch('http://localhost:3000/analyticsStats');
  
        const data = await response.json();
        
        setAnalyticsStats(data);
      };
  
      getAnalyticsStats();
    }, []);
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
