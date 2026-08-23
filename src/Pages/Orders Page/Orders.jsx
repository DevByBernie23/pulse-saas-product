import React from 'react';
import './Orders.css';
import { orders } from '../../data/data';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Orders = () => {
  return (
     <div>
       <div className="app">
        <div>
          <Header className="header" /> 
      {/* <Dashboard/> */}
      </div>
      
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