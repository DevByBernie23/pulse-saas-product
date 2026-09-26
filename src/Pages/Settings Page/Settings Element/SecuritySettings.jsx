import React, { useState, useEffect } from 'react';
import { z } from 'zod'

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
   newPassword: z.string().min(8, 'New password must be atleast 8 characters'),
   confirmPassword: z.string().min(1, 'Confirm new password')
})
.refine((data) => data.newPassword === data.confirmPassword,{
message: 'Passwords do not match',
path: ['confirmPassword'],
})

const SecuritySettings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassWord] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const handlePasswordChange = () => {
    const result = passwordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    })

    if(!result.success){
      setError(result.error.issues[0].message)
      return
    }
  }
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

        <button className="secondary-btn"
  onClick={() => setShowPasswordModal(true)}>
          Change Password
        </button>
      </div>
      {showPasswordModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h3>Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)}>X</button>
            </div>
            <div className='form-group'>
              <label>Current password</label>
              <input type='password' placeholder='Enter current password' value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value), setError(null)}}/>
            </div>
            <div className='form-group'>
              <label>New password</label>
              <input type='password' placeholder='Enter a new password' value={newPassword} onChange={(e) => {setNewPassWord(e.target.value), setError(null)}}/>
            </div>
            <div className='form-group'>
              <label>Confirm new password</label>
              <input type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value), setError(null)}}/>
            </div>
            {error && (
  <p className="form-error">
    {error}
  </p>
)}
            <div className='modal-actions'>
              <button className='secondary-button' type='button' onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button type='button' className='primary-btn' onClick={handlePasswordChange}> Change password</button>
            </div>
          </div>
        </div>
      )}

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