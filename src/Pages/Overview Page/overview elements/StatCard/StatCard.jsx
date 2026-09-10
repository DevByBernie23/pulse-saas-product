import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({stat}) => {
  const [ stats, setStats ] = useState([])

      useEffect(() => {
        const getStats = async () => {
          const response = await fetch('http://localhost:3000/stats');
    
          const data = await response.json();
          
          setStats(data);
        };
    
        getStats();
      }, []);
  return (
    <div className='stat-card'>
      <p>{stat.title}</p>
      <p>{stat.value}</p>
      <p>{stat.change}</p>
    </div>
  );
}

export default StatCard;
