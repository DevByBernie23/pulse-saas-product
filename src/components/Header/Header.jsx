import {  homepage } from '../../data/routes';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">

      <div className="header-brand">
        <div className="header-logo">
          P
        </div>

        <Link to={homepage}><span>Pulse</span></Link>
      </div>

      <div className="header-page">
        <h2>Overview</h2>
        <p>Good morning, Bernice</p>
      </div>

      <div className="header-left">
        <div className="search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search..."
          />

          <span className="search-shortcut">
            ⌘ K
          </span>
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
            B
          </div>

          <div className="profile-info">
            <strong>Bernice</strong>
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