import React, { useState } from 'react';

const PreferencesSettings = () => {

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');

  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Preferences</h2>

        <p>
          Customize your Pulse experience.
        </p>
      </div>

      <div className="form-group">
        <label>Theme</label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="form-group">
        <label>Language</label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

    </div>
  );
};

export default PreferencesSettings;