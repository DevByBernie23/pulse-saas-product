import { Link, useNavigate } from 'react-router-dom';
import './GetStarted.css';
import { signin } from '../../data/routes';
import { useState } from 'react';
import { z } from 'zod';

const GetStarted = () => {
  const signupValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
 
const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = signupValidation.safeParse({
  firstName: firstName.trim(),
  lastName: lastName.trim(),
  email: email.trim(),
  password,
});

if (!result.success) {
  console.log(result.error.issues);
  return;
}

console.log('Validation successful:', result.data);
const response = await fetch('http://localhost:3000/users');

if (!response.ok) {
  throw new Error('Failed to check existing users');
}

const users = await response.json();

const emailExists = users.some(
  (user) => user.email.toLowerCase() === email.trim().toLowerCase()
);

if (emailExists) {
  console.log('An account with this email already exists');
  return;
}
const newUser = {
  firstName: firstName.trim(),
  lastName: lastName.trim(),
  email: email.trim(),
  password,
};

try {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to create account');
  }

  const createdUser = await response.json();

  console.log('Account created:', createdUser);
  setSuccess(true)
  setTimeout(() => {
  navigate(signin);
}, 1500);

} catch (error) {
  console.error('Signup error:', error);
}
}
  return (
    <div className="get-started">

      <div className="get-started-brand">
        <Link to="/">Pulse</Link>
      </div>

      <div className="get-started-content">

        <div className="get-started-intro">
          <p>GET STARTED WITH PULSE</p>

          <h1>
            Take control of your
            <span> business.</span>
          </h1>

          <h2>
            Create your Pulse account and start managing
            your business from one simple dashboard.
          </h2>
        </div>
          {success && (
  <p>
    Account created successfully! You can now log in.
  </p>
)}
        <form className="signup-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First name
              </label>

              <input
                id="firstName"
                type="text"
                 value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last name
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
  onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              value={email}
  onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
  onChange={(e) => setPassword(e.target.value)}
            />
          </div>

         
         <button type="submit" className="signup-btn"> 
            Create account
          </button>

          <p className="login-text">
            Already have an account?
            <Link to={signin}> Log in</Link>
          </p>

        </form>

      </div>

      <p className="get-started-footer">
        © 2026 Pulse. Built for growing businesses.
      </p>

    </div>
  );
};

export default GetStarted;