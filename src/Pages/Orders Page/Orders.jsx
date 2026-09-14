import React from 'react';
import './Orders.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Orders = () => {
   const [orders, setOrdersData] = useState([])
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All statuses');
    const [dateFilter, setDateFilter] = useState('All dates')
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    

    const ordersPerPage = 5;

       useEffect(() => {
        const getOrdersData = async () => {
          setLoading(true)
          try{
            const response = await fetch('http://localhost:3000/orders');
            if (!response.ok) {
          throw new Error('Failed to fetch order data');
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
  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter, dateFilter]);

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
      <h2>No order data</h2>
      <p>There is currently no order data to display.</p>
    </section>
  );
}

const filteredOrders = orders.filter((order) => {
  const matchesSearch = order.customer
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All statuses' ||
    order.status === statusFilter;

  const matchesDate = (() => {
    if (dateFilter === 'All dates') return true;

    const orderDate = new Date(order.date);
    const today = new Date();

    if (dateFilter === 'Today') {
      return orderDate.toDateString() === today.toDateString();
    }

    if (dateFilter === 'This month') {
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }
  

    if (dateFilter === 'This week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);

      return orderDate >= weekAgo && orderDate <= today;
    }

    return true;
  })();

  return matchesSearch && matchesStatus && matchesDate;
});
if (filteredOrders.length === 0) {
  return (
    <section className="revenue-card">
      <h2>No matching orders</h2>
      <p>Try adjusting your search or filters.</p>
    </section>
  );
}
const startIndex = (currentPage - 1) * ordersPerPage;
const endIndex = startIndex + ordersPerPage;

const currentOrders = filteredOrders.slice(startIndex, endIndex);
const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
const exportOrders = () => {
  const headers = [
  'Order ID',
  'Customer',
  'Email',
  'Amount',
  'Status',
  'Payment',
  'Date',
];

const rows = filteredOrders.map((order) => [
  order.id,
  order.customer,
  order.email,
  order.amount,
  order.status,
  order.payment,
  order.date,
]);

const csvContent = [
  headers,
  ...rows,
]
  .map((row) => row.join(','))
  .join('\n');

console.log(csvContent);
const blob = new Blob([csvContent], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = link.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
link.click();
URL.revokeObjectURL(url);
};

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

        <button className="export-btn" onClick={exportOrders}>
          Export
        </button>
      </section>

      <section className="orders-content">

        <div className="orders-toolbar">

  <input
    type="text"
    placeholder="Search orders..."
    value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select 
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option>All statuses</option>
    <option>Completed</option>
    <option>Processing</option>
    <option>Pending</option>
    <option>Cancelled</option>
  </select>

  <select
   value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}>
  
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
      {currentOrders.map((order) => (
        <tr  key={order.id}
  onClick={() => setSelectedOrder(order)  
  }
  className="order-row" >

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

       <div className="orders-pagination">
  <button
    type="button"
    onClick={() => setCurrentPage((page) => page - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    type="button"
    onClick={() => setCurrentPage((page) => page + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

      </section>
      {selectedOrder && (
  <section className="order-details">
    <div className="order-details-header">
      <div>
        <h2>Order #{selectedOrder.id}</h2>
        <p>Order details and payment information</p>
      </div>

      <button
        type="button"
        onClick={() => setSelectedOrder(null)}
      >
        Close
      </button>
    </div>

    <div className="order-details-content">
      <div>
        <h3>Customer</h3>
        <p>{selectedOrder.customer}</p>
        <span>{selectedOrder.email}</span>
      </div>

      <div>
  <h3>Order Information</h3>
  <p>Amount: ${selectedOrder.amount.toLocaleString()}</p>
  <p>Status: {selectedOrder.status}</p>
  <p>Payment: {selectedOrder.payment}</p>
  <p>Date: {selectedOrder.date}</p>
</div>

<div>
  <h3>Payment Information</h3>
  <p>Method: {selectedOrder.paymentMethod || 'Not available'}</p>
  <p>
    Transaction ID:{' '}
    {selectedOrder.transactionId || 'Not available'}
  </p>
</div>
{selectedOrder.refund && (
  <div>
    <h3>Refund Information</h3>

    <p>
      Refund amount: $
      {selectedOrder.refund.amount.toLocaleString()}
    </p>

    <p>
      Refund status: {selectedOrder.refund.status}
    </p>

    <p>
      Refund date: {selectedOrder.refund.date}
    </p>

    <p>
      Reason: {selectedOrder.refund.reason}
    </p>
  </div>
)}
{(selectedOrder.status === 'Pending' ||
  selectedOrder.status === 'Processing') && (
  <div className="order-actions">
    <h3>Order Actions</h3>

<button
  type="button"
  onClick={() => setShowCancelModal(true)}
>
  Cancel Order
</button>
  </div>
)}
    </div>
    {showCancelModal && (
  <div className="cancel-modal-overlay">
    <div className="cancel-modal">
      <h2>Cancel Order?</h2>

      <p>
        Are you sure you want to cancel order #{selectedOrder.id}?
        This will mark the payment as refunded.
      </p>

      <div className="cancel-modal-actions">
        <button
          type="button"
          onClick={() => setShowCancelModal(false)}
        >
          Keep Order
        </button>

        <button
          type="button"
          onClick={async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/orders/${selectedOrder.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Cancelled',
          payment: 'Refunded',
          refund: {
            amount: selectedOrder.amount,
            status: 'Completed',
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            reason: 'Customer requested cancellation',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to cancel order');
    }

    const updatedOrder = await response.json();

    setOrdersData((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );

    setSelectedOrder(updatedOrder);
    setShowCancelModal(false);
  } catch (error) {
    console.error('Cancel order error:', error);
  }
}}
        >
          Confirm Cancellation
        </button>
      </div>
    </div>
  </div>
)}
  </section>
  
)}


    </main>
    </div>
    </div>
   
  );
};

export default Orders;