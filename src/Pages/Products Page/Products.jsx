import React from 'react';
import { products } from '../../data/data';
import './Products.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Products = () => {
  return (
    <div>
       <div className="app">
        
          <Header className="header" /> 
      
      
      <Nav className="nav"/>
      <main className="hero">

      <section className="products-intro">
        <div>
          <h1>Products</h1>

          <p>
            Manage your products, pricing, and inventory.
          </p>
        </div>

        <button className="add-product-btn">
          + Add Product
        </button>
      </section>

      <section className="products-content">

        <div className="products-toolbar">

  <input
    type="text"
    placeholder="Search products..."
  />

  <select>
    <option>All categories</option>
    <option>Subscription</option>
    <option>Add-on</option>
  </select>

  <select>
    <option>All statuses</option>
    <option>Active</option>
    <option>Out of Stock</option>
  </select>

</div>

       <div className="products-table-container">

  <table className="products-table">

    <thead>
      <tr>
        <th>Product</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {products.map((product) => (
        <tr key={product.id}>

          <td>
            <div className="product-info">

              <div className="product-icon">
                {product.name.charAt(0)}
              </div>

              <span>{product.name}</span>

            </div>
          </td>

          <td>{product.category}</td>

          <td>
            ${product.price.toLocaleString()}
          </td>

          <td>
            {product.stock}
          </td>

          <td>
            <span
              className={`product-status ${
                product.status === "Active"
                  ? "active"
                  : "out-of-stock"
              }`}
            >
              {product.status}
            </span>
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

export default Products;