 import React from 'react';
import './Customer.css';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Customers = () => {
     const [customers, setCustomerData] = useState([])
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [showForm, setShowForm] = useState(false);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [searchTerm, setSearchTerm] = useState('');
     const [statusFilter, setStatusFilter] = useState('All customers');

     useEffect(() => {
      const getCustomer = async () => {
        setLoading(true)

        try{
         const response = await fetch('http://localhost:3000/customers');
          if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
      
        const data = await response.json();

        console.log('Customer data:', data);

        setCustomerData(data);
        }
        catch (error) {
        console.error('Customer error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
      getCustomer();
    }, []);
     if (loading) {
    return (
      <section>
        <h2>Loading customer data...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="revenue-card">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </section>
    )}
    if (customers.length === 0) {
  return (
    <section className="revenue-card">
      <h2>No customer data</h2>
      <p>There is currently no customer data to display.</p>
    </section>
  );
}
const addCustomer = async () => {
  const result = customerValidation.safeParse({
    name: name.trim(),
    email: email.trim(),
  });

  if (!result.success) {
    console.log(result.error.issues);
    return;
  }

  const nameExists = customers.some(
  (customer) => customer.name.toLowerCase() === name.trim().toLowerCase()
);
if (nameExists) {
  console.log('A customer with this name already exists');
  return;
}
  const newCustomer = {
    name,
    email,
    status: 'Active',
    spent: 0,
    joined: new Date().toISOString().split('T')[0],
  };

  try {
    const response = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      throw new Error('Failed to add customer');
    }

    const createdCustomer = await response.json();
    setCustomerData((currentCustomers) => [
  ...currentCustomers,
  createdCustomer,
])
  setName('');
setEmail('');
setShowForm(false);

    console.log('Created customer:', createdCustomer);
  } catch (error) {
    console.error('Add customer error:', error);
  }
}
const filteredCustomers = customers.filter((customer) => {
  const matchesSearch = customer.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All customers' ||
    customer.status === statusFilter;

  return matchesSearch && matchesStatus;
});
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

       <button
  className="add-customer-btn"
  onClick={() => setShowForm(true)}
>
  + Add Customer
</button>
      </section>
      {showForm && (
  <div className="add-customer-form">
    <h2>Add Customer</h2>

    <input
  type="text"
  placeholder="Customer name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

    <input
  type="email"
  placeholder="Customer email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

    <button type="button" onClick={addCustomer}>
      Add Customer
    </button>
  </div>
)}

      <section className="customers-content">
        <div className="customer-toolbar">

  <div className="search-box">
    <input
      type="text"
      placeholder="Search customers..."
      value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
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
    {filteredCustomers.map((customer) => (
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