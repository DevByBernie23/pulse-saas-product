import React, { useState } from 'react';

const ProfileSettings = () => {

  const [name, setName] = useState('Bernice Ahuoiza');
  const [email, setEmail] = useState('bernice@123.com');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email
    });
  };

  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Profile</h2>

        <p>
          Update your personal information.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="profile-avatar">
          BA
        </div>

        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default ProfileSettings;