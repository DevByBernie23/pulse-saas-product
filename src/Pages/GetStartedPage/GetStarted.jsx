import { Link } from 'react-router-dom';
import './GetStarted.css';
import { overview, signin } from '../../data/routes';

const GetStarted = () => {
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

        <form className="signup-form">

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First name
              </label>

              <input
                id="firstName"
                type="text"
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last name
              </label>

              <input
                id="lastName"
                type="text"
                placeholder=""
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
            />
          </div>

         <Link to={overview}>
         <button type="submit" className="signup-btn">
            Create account
          </button></Link> 

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