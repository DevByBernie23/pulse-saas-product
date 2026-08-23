import React from 'react';
import './StatCard.css';

const StatCard = ({stat}) => {
  return (
    <div className='stat-card'>
      <p>{stat.title}</p>
      <p>{stat.value}</p>
      <p>{stat.change}</p>
    </div>
  );
}

export default StatCard;
