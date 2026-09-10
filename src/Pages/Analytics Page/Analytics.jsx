import React from 'react';
import './Analytics.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import AnalyticsStats from '../../components/Analytics stats/AnalyticsStats';

const Analytics = () => {
  
  return (

     
       <div className="app">
          <Header className="header" /> 
  
      <Nav className="nav"/>
      <main className='hero'><AnalyticsStats/></main>
    

      
    
    </div>
   
  );
};

export default Analytics;