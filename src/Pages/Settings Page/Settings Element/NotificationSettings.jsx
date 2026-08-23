import React, { useState } from 'react';

const NotificationSettings = () => {

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

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
          onChange={() =>
            setEmailNotifications(!emailNotifications)
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
          onChange={() =>
            setOrderNotifications(!orderNotifications)
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
          onChange={() =>
            setMarketingNotifications(!marketingNotifications)
          }
        />

      </div>

    </div>
  );
};

export default NotificationSettings;