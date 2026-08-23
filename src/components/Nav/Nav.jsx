import { Link } from 'react-router-dom';
import './Nav.css'
import { analytics, home, overview, customers, customerOrders, productsInStore, billing, settings} from '../../data/routes';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="logo">
       
      </div>

      <div className="nav-section">
        {/* <Link to={home}><p>Dashboard</p></Link> */}
         <p>OVERVIEW</p>
        <div className="nav-links">
          
          <Link to={overview}>Overview</Link>
          <Link to={analytics}>Analytics</Link>
        </div>
      </div>

      <div className="nav-section">
        <p>MANAGEMENT</p>

        <div className="nav-links">
          <Link to={customers}>Customers</Link>
          <Link to={customerOrders}>Orders</Link>
          <Link to={productsInStore}>Products</Link>
        </div>
        </div>

       <div className="nav-section">
          <p>FINANCE</p>
          <div className="nav-links">
          <Link to={billing}>Billing</Link>
        </div>
      </div>

      <div className="nav-section">
        <p>Settings</p>

        <div className="nav-links">
          <Link to={settings}>Settings</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;