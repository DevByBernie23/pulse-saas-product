import React, { useState } from 'react';
import { useWorkspace } from '../../../context/WorkspaceContext';

const WorkspaceSettings = () => {

  const {workspace, setWorkspace, saveWorkspace, workspaceName, loading } = useWorkspace()

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
          onChange={(e) => setWorkspace(e.target.value)}
        />

      </div>

      <button className="save-btn" onClick={saveWorkspace}>
        Save Changes
      </button>

    </div>
  );
};

export default WorkspaceSettings;