import {
  homepage,
  analytics,
  overview,
  customers,
  customerOrders,
  productsInStore,
  billing,
  settings
} from '../../data/routes';
import { useWorkspace } from '../../context/WorkSpaceContext';
import { Link } from 'react-router-dom';
import './Nav.css'
const Nav = () => {
   const {workspaceName} = useWorkspace()
  return (
    <nav className="nav">

      <div className="nav-logo">
        <div className="nav-logo-mark">
          {workspaceName? workspaceName.charAt(0).toUpperCase() : 'P'}
        </div>

        <Link to={homepage}>
          <span>{workspaceName || 'Your Workspace'}</span>
        </Link>
      </div>

      <div className="nav-section">
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
        <p>SETTINGS</p>

        <div className="nav-links">
          <Link to={settings}>Settings</Link>
        </div>
      </div>

    </nav>
  );
}

export default Nav