import { Link } from 'react-router-dom';
import './SignIn.css';
import { overview } from '../../data/routes';

const SignIn = () => {
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

        <form className="signin-form">

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
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
            />
          </div>

          <Link to={overview}><button type="submit" className="signin-btn">
            Sign in
          </button></Link>

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