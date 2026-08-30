import React from 'react';
import Dashboard from '../../Elements/Dashboard';
import Header from './../../components/Header/Header';
import Nav from './../../components/Nav/Nav';
import Hero from './../../components/Hero/Hero';

const Overview = () => {
  return (
    <div>
       <div className="app">
          <Header className="header" /> 
      
      <Nav className="nav"/>
      <Hero className="hero"/>
    </div>
    </div>
  );
}

export default Overview;
