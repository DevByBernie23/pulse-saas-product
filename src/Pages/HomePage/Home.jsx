import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { getstarted, signin } from '../../data/routes';
import RevenueChart from '../Overview Page/overview elements/RevenueChart/RevenueChart';
import AnalyticsStats from '../../components/Analytics stats/AnalyticsStats';
import { useState } from 'react';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="home">

      {/* Header */}
      <header className="home-header">
        <Link to="/" className="brand">
  <img src="/pulse-logo.png" alt="Pulse" />
  <span>Pulse</span>
</Link>
       
        <button
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle navigation"
>
  ☰
</button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <Link to={signin}>Login</Link>

          <Link to={getstarted}><button className="getstarted-btn">
            Get Started
          </button></Link>
        </nav>
      </header>


      {/* Hero */}
      <section className="home-hero">

        <h3>RUN YOUR BUSINESS BETTER</h3>

        <h1>
          Know your business.
          <br />
          Move with confidence.
        </h1>

        <p>
          Everything you need to understand your business,
          manage customers, track orders and monitor growth.
        </p>

        <div>
          <Link to={getstarted}><button>Get Started</button></Link>
         <Link>View Dashboard</Link>
        </div>

        {/* Dashboard Preview */}
        <div className="dashboard-preview">
          <div className="preview-header">
            Pulse Dashboard
          </div>

          <div className="preview-content">
            <div className="preview-stat">
              <span>Revenue</span>
              <strong>$8,250</strong>
            </div>

            <div className="preview-stat">
              <span>Customers</span>
              <strong>1,284</strong>
            </div>

            <div className="preview-stat">
              <span>Orders</span>
              <strong>342</strong>
            </div>
          </div>

          <div className="preview-chart">
            <RevenueChart/>
          </div>
        </div>

      </section>


      {/* Features */}
      <section id="features" className="home-features">

        <p>EVERYTHING IN ONE PULSE</p>

        <h2>
          Everything you need to understand your business.
        </h2>

        <div>
          <div>
            <h3>Revenue</h3>
            <p>
              Keep track of your business revenue and
              understand how you're performing.
            </p>
          </div>

          <div>
            <h3>Customers</h3>
            <p>
              Manage your customers and understand
              who's driving your business.
            </p>
          </div>

          <div>
            <h3>Orders</h3>
            <p>
              Keep your orders organized and easy to
              monitor.
            </p>
          </div>

          <div>
            <h3>Analytics</h3>
            <p>
              Turn your business data into meaningful
              insights.
            </p>
          </div>
        </div>

      </section>


      {/* Analytics */}
      <section id="solutions" className="home-analytics">

        <p>KNOW WHAT'S HAPPENING</p>

        <h2>
          See your business clearly.
        </h2>

        <p>
          Track revenue and business performance in real
          time with simple, meaningful analytics.
        </p>

        <div className="analytics-preview">
      
         <AnalyticsStats/>
        </div>

      </section>


      {/* Growth */}
      <section className="home-growth">

        <p>BUILT FOR GROWTH</p>

        <h2>
          Everything connected in one place.
        </h2>

        <div className="growth-links">
         <Link >Customers</Link>
          <Link >Orders</Link>
          <Link >Products</Link>
          <Link >Billing</Link>
        </div>

      </section>


      {/* CTA */}
      <section id="pricing" className="home-cta">

        <h2>
          Your business. Your Pulse.
        </h2>

        <p>
          Take control of your business with a workspace
          designed to help you move forward.
        </p>

        <Link to={getstarted}><button>
          Start using Pulse
        </button></Link>

      </section>


      {/* Footer */}
      <footer className="home-footer">
        <h2>Pulse</h2>

        <p>
          © 2026 Pulse. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Home;