import "./Authentication.css";
import "./Login.css";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

function Login() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dipatch = useDispatch();

  const handleLogin = () => {
    const userData = {  }
  }

  return (
    <form className="authentication-form">
      <h1 className="authentication-title">Login</h1>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      <Link className="forgot-password" to="/password/forgot">Forgot Password?</Link>
      <button className="authentication-button">LOGIN</button>
      <span className="new-user">Not registered? <Link to="/register">Create an account</Link></span>
    </form>
  );
}

export default Login;
