import React from 'react';
import './Orders.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Orders = () => {
   const [orders, setOrdersData] = useState([])
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
       useEffect(() => {
        const getOrdersData = async () => {
          setLoading(true)
          try{
            const response = await fetch('http://localhost:3000/orders');
            if (!response.ok) {
          throw new Error('Failed to fetch revenue data');
            }
        const data = await response.json();

        console.log('Orders:', data);
        setOrdersData(data);
      } catch (error) {
        console.error('Order error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    getOrdersData();
  }, []);

  if (loading) {
    return (
      <section className="revenue-card">
        <h2>Loading orders...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="revenue-card">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </section>
    );
  }
if (orders.length === 0) {
  return (
    <section className="revenue-card">
      <h2>No customer data</h2>
      <p>There is currently no currently data to display.</p>
    </section>
  );
}
  return (
     <div>
       <div className="app">
        
          <Header className="header" /> 
      
      
      <Nav className="nav"/>
       <main className="hero">

      <section className="orders-intro">
        <div>
          <h1>Orders</h1>
          <p>
            Manage and track customer orders.
          </p>
        </div>

        <button className="export-btn">
          Export
        </button>
      </section>

      <section className="orders-content">

        <div className="orders-toolbar">

  <input
    type="text"
    placeholder="Search orders..."
  />

  <select>
    <option>All statuses</option>
    <option>Completed</option>
    <option>Processing</option>
    <option>Pending</option>
    <option>Cancelled</option>
  </select>

  <select>
    <option>All dates</option>
    <option>Today</option>
    <option>This week</option>
    <option>This month</option>
  </select>

</div>

        <div className="orders-table-container">

  <table className="orders-table">

    <thead>
      <tr>
        <th>Order</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Payment</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>

          <td className="order-id">
            #{order.id}
          </td>

          <td>
            <div className="order-customer">
              <strong>{order.customer}</strong>
              <span>{order.email}</span>
            </div>
          </td>

          <td>
            ${order.amount.toLocaleString()}
          </td>

          <td>
            <span
              className={`order-status ${order.status.toLowerCase()}`}
            >
              {order.status}
            </span>
          </td>

          <td>
            <span className={`payment ${order.payment.toLowerCase()}`}>
              {order.payment}
            </span>
          </td>

          <td>{order.date}</td>

        </tr>
      ))}
    </tbody>

  </table>

</div>

        {/* Pagination */}

      </section>

    </main>
    </div>
    </div>
   
  );
};

export default Orders;