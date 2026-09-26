import React, { useState, useEffect } from 'react';

const NotificationSettings = () => {

  const [emailNotifications, setEmailNotifications] = useState(
  localStorage.getItem('emailNotifications') !== 'false'
);

const [orderNotifications, setOrderNotifications] = useState(
  localStorage.getItem('orderNotifications') !== 'false'
);

const [marketingNotifications, setMarketingNotifications] = useState(
  localStorage.getItem('marketingNotifications') === 'true'
);
useEffect (() => {
localStorage.setItem('emailNotifications', emailNotifications);
}, [emailNotifications]);

useEffect (() =>{
localStorage.setItem('orderNotifications', orderNotifications)
}, [orderNotifications]);

useEffect (() => {
localStorage.setItem('marketingNotifications', marketingNotifications)
}, [marketingNotifications])
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Notifications</h2>

        <p>
          Choose what notifications you receive.
        </p>
      </div>

      <div className="setting-option">

        <div>
          <strong>Email notifications</strong>

          <span>
            Receive general account updates.
          </span>
        </div>

        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={(e) =>
            setEmailNotifications(e.target.checked)
          }
        />

      </div>

      <div className="setting-option">

        <div>
          <strong>Order notifications</strong>

          <span>
            Get notified when new orders are placed.
          </span>
        </div>

        <input
          type="checkbox"
          checked={orderNotifications}
          onChange={(e) =>
            setOrderNotifications(e.target.checked)
          }
        />

      </div>

      <div className="setting-option">

        <div>
          <strong>Marketing notifications</strong>

          <span>
            Receive product updates and announcements.
          </span>
        </div>

        <input
          type="checkbox"
          checked={marketingNotifications}
          onChange={(e) =>
            setMarketingNotifications(e.target.checked)
          }
        />

      </div>

    </div>
  );
};

export default NotificationSettings;