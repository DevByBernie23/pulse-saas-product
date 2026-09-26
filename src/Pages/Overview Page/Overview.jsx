import React from 'react';
import Header from './../../components/Header/Header';
import Nav from './../../components/Nav/Nav';
import Hero from './../../components/Hero/Hero';

const Overview = () => {
  return (
    <div>
       <div className="app">
          <Header/> 
      
      <Nav/>
      <Hero/>
    </div>
    </div>
  );
}

export default Overview;
