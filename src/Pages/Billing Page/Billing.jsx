
import React from 'react';
import './Billing.css';
import { billingHistory } from '../../data/data';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Billing = () => {
  return (
     <div>
       <div className="app">
        <div>
          <Header className="header" /> 
      {/* <Dashboard/> */}
      </div>
      
      <Nav className="nav"/>
       <main className="hero">

      <section className="billing-intro">
        <h1>Billing</h1>

        <p>
          Manage your subscription and billing information.
        </p>
      </section>

      <section className="current-plan">

  <div className="plan-header">
    <div>
      <span className="section-label">
        Current Plan
      </span>

      <h2>Professional</h2>

      <p>
        Everything you need to manage your growing business.
      </p>
    </div>

    <div className="plan-price">
      <strong>$49</strong>
      <span>/ month</span>
    </div>
  </div>

  <div className="plan-features">

    <span>✓ Unlimited projects</span>
    <span>✓ Advanced analytics</span>
    <span>✓ Team collaboration</span>
    <span>✓ Priority support</span>

  </div>

  <button className="manage-plan-btn">
    Manage Plan
  </button>

</section>

      <section className="billing-card">

  <div className="card-heading">
    <div>
      <h2>Payment Method</h2>

      <p>
        Your default payment method.
      </p>
    </div>

    <button>Edit</button>
  </div>

  <div className="payment-method">

    <div className="card-icon">
      💳
    </div>

    <div>
      <strong>Visa ending in 4242</strong>
      <span>Expires 08/28</span>
    </div>

  </div>

</section>

      <section className="billing-card">

  <div className="card-heading">
    <div>
      <h2>Billing History</h2>

      <p>
        View your previous invoices and payments.
      </p>
    </div>
  </div>

  <div className="billing-table-container">

    <table className="billing-table">

      <thead>
        <tr>
          <th>Invoice</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {billingHistory.map((invoice) => (
          <tr key={invoice.id}>

            <td>
              <strong>{invoice.id}</strong>
            </td>

            <td>{invoice.date}</td>

            <td>
              ${invoice.amount.toFixed(2)}
            </td>

            <td>
              <span className="invoice-status">
                {invoice.status}
              </span>
            </td>

            <td>
              <button className="invoice-btn">
                View
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>

  </div>

</section>

    </main>
    </div>
    </div>
   
  );
};

export default Billing;