import React, { useState, useEffect } from 'react';
import './StatCard.css';

const StatCard = ({stat}) => {

  return (
    <div className='stat-card'>
      <p>{stat.title}</p>
      <h3>{stat.value}</h3>
      <span>{stat.change}</span>
    </div>
  );
}

export default StatCard;
