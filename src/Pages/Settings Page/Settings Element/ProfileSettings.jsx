import React, { useState, useEffect } from 'react';
import { z } from 'zod'
import { useUser } from '../../../context/userContext';
const ProfileSettings = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState(null)
  const [saving, setSaving] = useState(false)
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(false)
  const { currentUser, setCurrentUser } = useUser();

const currentUserId = currentUser?.id;

  useEffect(() => {
    const getProfile = async () => {

      try{
        setLoading(true)

        const profileResponse = await fetch(`http://localhost:3000/users/${currentUserId}`)
      if(!profileResponse.ok){
       throw new Error('Failed to fetch profile data')
      }
      const profileData = await profileResponse.json()
      setProfiles(profileData)
      setUserName(profileData.userName)
      setEmail(profileData.email)
      } catch(error){
        setError(error.message)
      }finally{
        setLoading(false)
      }
    }
    getProfile()
  }, [])
  const profileValidation = z.object({
    userName: z.string().min(1, 'username is required'),
    email: z.string().min(1, 'email is required'),
  });

const changeProfile = async (e) => {
  e.preventDefault()

  const data ={
     userName: userName.trim(),
    email: email.trim(),
  }
  const result = profileValidation.safeParse(data)

  if(!result.success){
    const errors ={};

    result.error.issues.forEach((issue) => {
      errors[issue.path[0]] = issue.message
    })
    setFormErrors(errors)
    return;
  }
  try{
    setFormErrors({})
    setSaving(true)

     
    const response = await fetch(
      `http://localhost:3000/users/${currentUserId}`,

    {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
      userName: userName.trim(),
      email: email.trim(),
    })
    }
    )
    if(!response.ok){
      throw new Error ('failed to update profile')
    }
    const savedProfile = await response.json()
    localStorage.setItem('currentUser', JSON.stringify(savedProfile));

    setProfiles(savedProfile)
    setEmail(savedProfile.email)
    setUserName(savedProfile.userName)
    setCurrentUser(savedProfile)
  } catch(error){
    setFormErrors({
      profile: error.message,
    })
  } finally{
    setSaving(false)
    
  }
}
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Profile</h2>

        <p>
          Update your personal information.
        </p>
      </div>

      <form onSubmit={changeProfile}>

        <div className="profile-avatar">
          {userName?.charAt(0)?.toUpperCase() || ""}
        </div>

        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          {saving? 'saving..' : 'Save Changes'}
        </button>

      </form>

    </div>
  );
};

export default ProfileSettings;