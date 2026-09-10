import { Link, useNavigate} from 'react-router-dom';
import './SignIn.css';
import { useState } from 'react';
import { z } from 'zod'


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

 const signinValidation = z.object({
email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
const handleSubmit = async (e) => {
  e.preventDefault();

  const result = signinValidation.safeParse({
    email: email.trim(),
    password,
  });

  if (!result.success) {
    console.log(result.error.issues);
    return;
  }

  console.log('Validation successful:', result.data);

try {
  const response = await fetch('http://localhost:3000/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = await response.json();
  const user = users.find(
  (user) => user.email.toLowerCase() === email.trim().toLowerCase()
);
if (!user) {
  console.log('No account found with this email');
  return;
}

if (user.password !== password) {
  console.log('Incorrect password');
  return;
}
const loggedInUser = {
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
};

localStorage.setItem(
  'currentUser',
  JSON.stringify(loggedInUser)
);

console.log('Login successful!');
navigate('/overview');

} catch (error) {
  console.error('Login error:', error);
}
}
  return (
    <div className="sign-in">

      <div className="sign-in-brand">
        <Link to="/">Pulse</Link>
      </div>

      <div className="sign-in-content">

        <div className="sign-in-intro">
          <p>WELCOME BACK</p>

          <h1>
            Welcome back to
            <span> Pulse.</span>
          </h1>

          <h2>
            Sign in to continue managing your business,
            customers and growth.
          </h2>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
               value={email}
  onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">
                Password
              </label>

              <a href="#forgot">
                Forgot password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
               value={password}
  onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="signin-btn">
            Sign in
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/get-started"> Get started</Link>
          </p>

        </form>

      </div>

      <p className="sign-in-footer">
        © 2026 Pulse. Built for growing businesses.
      </p>

    </div>
  );
};

export default SignIn;