import { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { login } from '../services/authenticationServices'
import UserContext from '../context/user';

export default function Login() {
  const location = useLocation()
  const history = useHistory();
  const { user: loggedInUser } = useContext(UserContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(emailAddress, password);
      console.log(location);
      window.location = location ? location.pathname : "/"
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Touch';
  }, []);
  console.log(location, history);

  if (loggedInUser) return <Redirect to={ROUTES.DASHBOARD} />

  return (
    <div className="login">
      <div className="login__box">
        <div className="login__box--sub">
          <h1 className="login__box--head">
            Bookshell
          </h1>

          {error && <p className="login__box--error">{error}</p>}

          <form className="login__form" onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="login__form--input"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="login__form--input"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`btn btn-login
            ${isInvalid && 'u-opacity-50'}`}
            >
              Login
            </button>
          </form>
        </div>

        <div className="login__box--foot">
          <p className="login__box--foot--content">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="u-text-blue">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
