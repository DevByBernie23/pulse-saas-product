
import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


  const Header = () => {
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');

    return savedUser ? JSON.parse(savedUser) : null;
  });
console.log('Header user:', currentUser);

  return (
    <header className="header">


      <div className="header-page">
        <h2>Overview</h2>
        <p>Good morning, {currentUser?.firstName}</p>
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
  {currentUser?.firstName?.charAt(0).toUpperCase()}
</div>

          <div className="profile-info">
            <strong>{currentUser?.firstName}</strong>
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