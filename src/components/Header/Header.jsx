
import { useUser } from '../../context/userContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useEffect, useState } from 'react';
import {
  customers as customersRoute,
  customerOrders,
  productsInStore,
} from '../../data/routes';
import { Link } from 'react-router-dom';
import './Header.css'

  const Header = () => {
  const {workspace} = useWorkspace()
  const {currentUser} = useUser()
  const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

 useEffect(() => {
  const getSearchData = async () => {
    if (!workspace) return;

    try {
      const [customersResponse, ordersResponse, productsResponse] =
        await Promise.all([
          fetch(
            `http://localhost:3000/customers?workspaceId=${workspace.id}`
          ),
          fetch(
            `http://localhost:3000/orders?workspaceId=${workspace.id}`
          ),
          fetch(
            `http://localhost:3000/products?workspaceId=${workspace.id}`
          ),
        ]);

      const customers = await customersResponse.json();
      const orders = await ordersResponse.json();
      const products = await productsResponse.json();


      setSearchResults([
        ...customers.map((customer) => ({
          type: 'Customer',
          id: customer.id,
          name: customer.name,
          detail: customer.email,
          path: customersRoute,
        })),

        ...orders.map((order) => ({
          type: 'Order',
          id: order.id,
          name: order.id,
          detail: `${order.customer} — $${order.amount}`,
          path: customerOrders,
        })),

        ...products.map((product) => ({
          type: 'Product',
          id: product.id,
          name: product.name,
          detail: product.price ? `$${product.price}` : 'Product',
          path: productsInStore,
        })),
      ]);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  getSearchData();
}, [workspace]);
const filteredResults = searchResults.filter((result) => {
  if (!searchTerm.trim()) return false;

  const search = searchTerm.toLowerCase();

  return (
    result.name.toLowerCase().includes(search) ||
    result.detail.toLowerCase().includes(search)
  );
});
  return (
    <header className="header">


      <div className="header-page">
        <h2>Overview</h2>
        <p>Good morning, {currentUser?.userName?.split(' ')[0]}</p>
      </div>

      <div className="header-left">
        <div className="search">
  <span className="search-icon">⌕</span>

  <input
    type="text"
    placeholder="Search customers, orders, products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <span className="search-shortcut">
    ⌘ K
  </span>

  {searchTerm && filteredResults.length > 0 && (
    <div className="search-results">
      {filteredResults.slice(0, 8).map((result) => (
        <Link
          key={`${result.type}-${result.id}`}
          to={result.path}
          className="search-result"
          onClick={() => setSearchTerm('')}
        >
          <div>
            <strong>{result.name}</strong>
            <span>{result.detail}</span>
          </div>

          <small>{result.type}</small>
        </Link>
      ))}
    </div>
  )}

  {searchTerm && filteredResults.length === 0 && (
    <div className="search-results">
      <p className="search-empty">No results found.</p>
    </div>
  )}
</div>
      </div>

      <div className="header-right">

        <button
          className="header-icon"
          aria-label="Notifications"
        >
          ♡
        </button>

        <div className="profile">

         <div className="profile-avatar">
  {currentUser?.userName?.charAt(0).toUpperCase()}
</div>

          <div className="profile-info">
            <strong>{currentUser?.userName?.split(' ')[0]}</strong>
            <span>Admin</span>
          </div>

          <span className="profile-arrow">
            ⌄
          </span>

        </div>

      </div>

    </header>
  );
};

export default Header;