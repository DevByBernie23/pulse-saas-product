 import React from 'react';
import './Customer.css';

import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { z } from 'zod'


const Customers = () => {
     const [customers, setCustomerData] = useState([])
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [showForm, setShowForm] = useState(false);
     const [editingCustomer, setEditingCustomer] = useState(null);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [searchTerm, setSearchTerm] = useState('');
     const [statusFilter, setStatusFilter] = useState('All customers');
     const [formErrors, setFormErrors] = useState({});
     const [saving, setSaving] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);

     const customersPerPage = 5;

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
    useEffect(() => {
  if (editingCustomer) {
    setName(editingCustomer.name);
    setEmail(editingCustomer.email);
    setShowForm(true);
  }
}, [editingCustomer]);
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
const customerValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
});
const addCustomer = async () => {
  const result = customerValidation.safeParse({
    name: name.trim(),
    email: email.trim(),
  });

  if (!result.success) {
  const errors = {};

  result.error.issues.forEach((issue) => {
    errors[issue.path[0]] = issue.message;
  });

  setFormErrors(errors);
  return;
}

setFormErrors({});
setSaving(true);
  if (editingCustomer) {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/${editingCustomer.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update customer');
    }

    const updatedCustomer = await response.json();

    console.log('Updated customer:', updatedCustomer);

    setCustomerData((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );

    setName('');
    setEmail('');
    setEditingCustomer(null);
    setShowForm(false);
    setSaving(false)
  } catch (error) {
    console.error('Update customer error:', error);
     setSaving(false);
  }

  return;
}

  const nameExists = customers.some(
  (customer) => customer.name.toLowerCase() === name.trim().toLowerCase()
);
if (nameExists) {
  setFormErrors({ name: 'A customer with this name already exists'
})
setSaving(false)
return}
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
    setSaving(false)
  }
}

const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customerId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }

    setCustomerData((currentCustomers) =>
      currentCustomers.filter(
        (customer) => customer.id !== customerId
      )
    );

    console.log('Customer deleted:', customerId);
  } catch (error) {
    console.error('Delete customer error:', error);
  }
};



const filteredCustomers = customers.filter((customer) => {
  const matchesSearch = customer.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All customers' ||
    customer.status === statusFilter;

  return matchesSearch && matchesStatus;
});
const startIndex = (currentPage - 1) * customersPerPage;
const endIndex = startIndex + customersPerPage;

const currentProducts = filteredProducts.slice(startIndex, endIndex);
const totalPages = Math.ceil(filteredProducts.length / ordersPerPage);
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
  <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>

    <input
  type="text"
  placeholder="Customer name"
  value={name}
  onChange={(e) => {
  setName(e.target.value);

  setFormErrors((currentErrors) => ({
    ...currentErrors,
    name: '',
  }));
}}
/>
  {formErrors.name && (
  <p className="form-error">{formErrors.name}</p>
)}

    <input
  type="email"
  placeholder="Customer email"
  value={email}
  onChange={(e) => {
  setEmail(e.target.value);

  setFormErrors((currentErrors) => ({
    ...currentErrors,
    email: '',
  }));
}}
/>

{formErrors.email && (
  <p className="form-error">{formErrors.email}</p>
)}

   <button
  type="button"
  onClick={addCustomer}
  disabled={saving}
>
  {saving
    ? editingCustomer
      ? 'Updating...'
      : 'Adding...'
    : editingCustomer
      ? 'Update Customer'
      : 'Add Customer'}
</button>
{editingCustomer && (
  <button
    type="button"
    onClick={() => {
      setEditingCustomer(null);
      setName('');
      setEmail('');
      setShowForm(false);
    }}
  >
    Cancel
  </button>
)}
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
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredCustomers.map((customer) => (
      <tr key={customer.id}>

        <td data-label="Customer">
          <div className="customer-name">
            <div className="customer-avatar">
              {customer.name.charAt(0)}
            </div>

            <span>{customer.name}</span>
          </div>
        </td>

        <td data-label="Email">{customer.email}</td>

        <td data-label = "Status">
          <span
            className={`status ${customer.status.toLowerCase()}`}
          >
            {customer.status}
          </span>
        </td>

        <td data-label="Total Spent">${customer.spent.toLocaleString()}</td>

        <td data-label="Joined">{customer.joined}</td>
      <td data-label="Actions">
  <div className="customer-actions">
    <button
      type="button"
      className="edit-customer-btn"
      onClick={() => setEditingCustomer(customer)}
    >
      Edit
    </button>

    <button
      type="button"
      className="delete-customer-btn"
      onClick={() => {
        const confirmed = window.confirm(
          `Are you sure you want to delete ${customer.name}?`
        );

        if (confirmed) {
          deleteCustomer(customer.id);
        }
      }}
    >
      Delete
    </button>
  </div>
</td>

      </tr>
    ))}
  </tbody>

</table>
</div>


        {/* Search and filters */}

        {/* Customer table */}

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

    </main>
    </div>
    </div>
    
  );
};

export default Customers;