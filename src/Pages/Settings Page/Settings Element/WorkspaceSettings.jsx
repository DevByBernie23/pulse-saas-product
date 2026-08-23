import React, { useState } from 'react';

const WorkspaceSettings = () => {

  const [workspaceName, setWorkspaceName] = useState('Pulse Workspace');

  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Workspace</h2>

        <p>
          Manage your workspace information.
        </p>
      </div>

      <div className="form-group">

        <label>
          Workspace name
        </label>

        <input
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />

      </div>

      <button className="save-btn">
        Save Changes
      </button>

    </div>
  );
};

export default WorkspaceSettings;