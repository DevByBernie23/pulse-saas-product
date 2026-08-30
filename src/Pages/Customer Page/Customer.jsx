 import React from 'react';
import './Customer.css';
import { customers } from '../../data/data';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Customers = () => {
  return (
    <div>
       <div className="app">
        
          <Header className="header" /> 
      
      
      <Nav className="nav"/>
      <main className="hero">

      <section className="customers-intro">
        <div>
          <h1>Customers</h1>
          <p>
            Manage your customers and view their activity.
          </p>
        </div>

        <button className="add-customer-btn">
          + Add Customer
        </button>
      </section>

      <section className="customers-content">
        <div className="customer-toolbar">

  <div className="search-box">
    <input
      type="text"
      placeholder="Search customers..."
    />
  </div>

  <select>
    <option>All customers</option>
    <option>Active</option>
    <option>Inactive</option>
  </select>

</div>
<div className="customers-table-container">
        <table className="customers-table">

  <thead>
    <tr>
      <th>Customer</th>
      <th>Email</th>
      <th>Status</th>
      <th>Total Spent</th>
      <th>Joined</th>
    </tr>
  </thead>

  <tbody>
    {customers.map((customer) => (
      <tr key={customer.id}>

        <td>
          <div className="customer-name">
            <div className="customer-avatar">
              {customer.name.charAt(0)}
            </div>

            <span>{customer.name}</span>
          </div>
        </td>

        <td>{customer.email}</td>

        <td>
          <span
            className={`status ${customer.status.toLowerCase()}`}
          >
            {customer.status}
          </span>
        </td>

        <td>${customer.spent.toLocaleString()}</td>

        <td>{customer.joined}</td>

      </tr>
    ))}
  </tbody>

</table>
</div>

        {/* Search and filters */}

        {/* Customer table */}

        {/* Pagination */}

      </section>

    </main>
    </div>
    </div>
    
  );
};

export default Customers;