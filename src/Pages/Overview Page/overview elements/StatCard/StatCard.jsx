import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({stat}) => {
  const [loading, setLoading] = useState(true);
  const [ stats, setStats ] = useState([])

      useEffect(() => {
        const getStats = async () => {
          setLoading(true)

          const response = await fetch('http://localhost:3000/stats');
    
          const data = await response.json();
          
          setStats(data);
          setLoading(false)
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
