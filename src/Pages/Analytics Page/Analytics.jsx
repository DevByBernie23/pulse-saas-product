import React from 'react';
import './Analytics.css';
import StatCard from '../Overview Page/overview elements/StatCard/StatCard';
import { analyticsStats } from '../../data/data';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Analytics = () => {
  return (

     <div>
       <div className="app">
        <div>
          <Header className="header" /> 
      {/* <Dashboard/> */}
      </div>
      
      <Nav className="nav"/>
       <main className="hero">

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

      {/* KPI cards */}

      {/* Revenue chart */}

      {/* Customer growth */}

      {/* Performance breakdown */}

    </main>
    </div>
    </div>
   
  );
};

export default Analytics;