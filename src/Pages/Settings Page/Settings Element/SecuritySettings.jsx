import React from 'react';

const SecuritySettings = () => {
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Security</h2>

        <p>
          Manage your account security.
        </p>
      </div>

      <div className="security-option">
        <div>
          <strong>Password</strong>

          <span>
            Last changed 30 days ago.
          </span>
        </div>

        <button className="secondary-btn">
          Change Password
        </button>
      </div>

      <div className="security-option">
        <div>
          <strong>Two-factor authentication</strong>

          <span>
            Add an extra layer of security to your account.
          </span>
        </div>

        <button className="secondary-btn">
          Enable
        </button>
      </div>

    </div>
  );
};

export default SecuritySettings;