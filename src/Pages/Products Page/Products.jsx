import React from 'react';
import { useState, useEffect } from 'react'; 
import './Products.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import {z} from 'zod'

const Products = () => {
   const [products, setProductsData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('All categories');
   const [statusFilter, setStatusFilter] = useState('All statuses');
   const [editProducts, setEditProducts] = useState('');
   const [showForm, setShowForm] = useState(false);
   const [productName, setProductName] = useState('');
   const [productCategory, setProductCategory] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [productStock, setProductStock] = useState('');
   const [formErrors, setFormErrors] = useState({});
   const [saving, setSaving] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);

   const productsPerPage = 5;

       useEffect(() => {
        const getProducts = async () => {

          try{
              const response = await fetch('http://localhost:3000/products');
               if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
      
        const data = await response.json();

        console.log('Customer data:', data);

        setProductsData(data);
        }
        catch (error) {
        console.error('Products error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
      getProducts();
    }, []);
     useEffect(() => {
      if (editProducts) {
        setProductName(editProducts.name);
        setProductCategory(editProducts.category);
        setProductPrice(editProducts.price)
        setProductStock(editProducts.stock)
        setShowForm(true);
      }
    }, [editProducts]);
         if (loading) {
        return (
          <section>
            <h2>Loading products data...</h2>
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
        if (products.length === 0) {
      return (
        <section className="revenue-card">
          <h2>No product data</h2>
          <p>There is currently no product data to display.</p>
        </section>
      );
    }
    const productValidation = z.object({
      name: z.string().min(1, 'Name is required'),
      category: z.string().min(1, 'category is required'),
      stock: z.number().min(1, 'stock is required'),
      price: z.number().min(1, 'price is required')
    });
    const addProducts = async () => {
      const result = productValidation.safeParse({
         name: productName.trim(),
  category: productCategory.trim(),
  stock: Number(productStock),
  price: Number(productPrice),
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
     if (editProducts) {
  try {
    const response = await fetch(
      `http://localhost:3000/products/${editProducts.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           name: productName.trim(),
category: productCategory.trim(),
stock: Number(productStock),
price: Number(productPrice),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update products');
    }

    const updatedProduct = await response.json();

    console.log('Updated product:', updatedProduct);

    setProductsData((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    setProductName('');
setProductCategory('');
setProductPrice('');
setProductStock('');
setShowForm(false);
setSaving(false);
  } catch (error) {
    console.error('Update product error:', error);
     setSaving(false);
  }

  return;
}
 const productExists = products.some(
  (product) => product.name.toLowerCase() === productName.trim().toLowerCase()
);
if (productExists && !editProducts) {
  setFormErrors({ name: 'A product with this name already exists'
})
setSaving(false)
return}
  const newProduct = {
    name: productName.trim(),
  category: productCategory.trim(),
  status: 'Active',
  stock: Number(productStock),
  price: Number(productPrice),
  };

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const createdProduct = await response.json();
    setProductsData((currentProducts) => [
  ...currentProducts,
  createdProduct,
])
    setProductName('');
    setProductCategory('');
    setProductPrice('')
    setProductStock('')
    setShowForm(false);
    setSaving(false);
    console.log('Created product:', createdProduct);
  } catch (error) {
    console.error('Add product error:', error);
    setSaving(false)
  }
}
const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/products/${productId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    setProductsData((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );

    console.log('Product deleted:', productId);
  } catch (error) {
    console.error('Delete product error:', error);
  }
};
const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All statuses' ||
    product.status === statusFilter;

  const matchesCategory =
  categoryFilter === 'All categories' ||
  product.category === categoryFilter

  return matchesSearch && matchesStatus && matchesCategory;
});

const startIndex = (currentPage - 1) * productsPerPage;
const endIndex = startIndex + productsPerPage;

const currentProducts = filteredProducts.slice(startIndex, endIndex);
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          + Add Product
        </button>
      </section>
       {showForm && (
  <div className="add-customer-form">
  <h2>{editProducts ? 'Edit Product' : 'Add Product'}</h2>

    <input
  type="text"
  placeholder="Product name"
  value={productName}
  onChange={(e) => {
  setProductName(e.target.value);

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
  type="text"
  placeholder="category"
  value={productCategory}
  onChange={(e) => {
  setProductCategory(e.target.value);

  setFormErrors((currentErrors) => ({
    ...currentErrors,
    category: '',
  }));
}}
/>

{formErrors.category && (
  <p className="form-error">{formErrors.category}</p>
)}

<input
  type="text"
  placeholder="stock"
  value={productStock}
  onChange={(e) => {
  setProductStock(e.target.value);

  setFormErrors((currentErrors) => ({
    ...currentErrors,
    stock: '',
  }));
}}
/>

{formErrors.stock && (
  <p className="form-error">{formErrors.stock}</p>
)}

<input
  type="text"
  placeholder="price"
  value={productPrice}
  onChange={(e) => {
  setProductPrice(e.target.value);

  setFormErrors((currentErrors) => ({
    ...currentErrors,
    price: '',
  }));
}}
/>

{formErrors.price && (
  <p className="form-error">{formErrors.price}</p>
)}

   <button
  type="button"
  onClick={addProducts}
  disabled={saving}
>
  {saving
    ? editProducts
      ? 'Updating...'
      : 'Adding...'
    : editProducts
      ? 'Update Products'
      : 'Add Products'}
</button>
{editProducts && (
  <button
    type="button"
    onClick={() => {
      setEditProducts(null);
      setProductName('');
      setProductCategory('');
      setProductPrice('')
      setProductStock('')
      setShowForm(false);
    }}
  >
    Cancel
  </button>
)}
  </div>
       )}

      <section className="products-content">

        <div className="products-toolbar">
          

  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}>
    <option>All categories</option>
    <option>Subscription</option>
    <option>Add-on</option>
  </select>

  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}>
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
      {filteredProducts.map((product) => (
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
          <td data-label="Actions">
  <div className="customer-actions">
    <button
      type="button"
      className="edit-customer-btn"
      onClick={() => setEditProducts(product)}
    >
      Edit
    </button>

    <button
      type="button"
      className="delete-customer-btn"
      onClick={() => {
        const confirmed = window.confirm(
          `Are you sure you want to delete ${product.name}?`
        );

        if (confirmed) {
          deleteProduct(product.id);
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

export default Products;