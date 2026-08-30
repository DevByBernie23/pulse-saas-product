import React, { useState } from 'react';
import './Settings.css';
import ProfileSettings from './Settings Element/ProfileSettings';
import PreferencesSettings from './Settings Element/PreferencesSettings';
import NotificationSettings from './Settings Element/NotificationSettings';
import SecuritySettings from './Settings Element/SecuritySettings';
import WorkspaceSettings from './Settings Element/WorkspaceSettings';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div>
       <div className="app">
        
          <Header className="header" /> 
      
      
      <Nav className="nav"/>
      <main className="hero">

      <section className="settings-intro">
        <h1>Settings</h1>

        <p>
          Manage your account and application preferences.
        </p>
      </section>

      <section className="settings-layout">

        <aside className="settings-sidebar">

          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>

          <button
            className={activeTab === 'preferences' ? 'active' : ''}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>

          <button
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>

          <button
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>

          <button
            className={activeTab === 'workspace' ? 'active' : ''}
            onClick={() => setActiveTab('workspace')}
          >
            Workspace
          </button>

        </aside>

        <div className="settings-content">

          {activeTab === 'profile' && (
            <ProfileSettings />
          )}

          {activeTab === 'preferences' && (
            <PreferencesSettings />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings />
          )}

          {activeTab === 'security' && (
            <SecuritySettings />
          )}

          {activeTab === 'workspace' && (
            <WorkspaceSettings />
          )}

        </div>

      </section>

    </main>
    </div>
    </div>
    
  );
};

export default Settings;