import "./Authentication.css";
import "./Login.css";

import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { getCart } from "../../redux/cart/cartService";

import axios from "axios";

import Cookies from "js-cookie";
import { Toast } from "primereact/toast";

function Login() {
  const toast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!emailInput && !passwordInput) {
      setIsSubmitting(false);
      showEmptyError();
      return;
    }
    axios
      .post(`${import.meta.env.VITE_REACT_API_URL}/login`, {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        Cookies.set("token", res.data.token, { expires: 7, secure: true });
        axios
          .get(`${import.meta.env.VITE_REACT_API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((res) => {
            dispatch(login(res.data));
            dispatch(getCart());
          });
        navigate("/");
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleInputChange = (e) => {
    if (e.target.id === "email") {
      setEmailInput(e.target.value);
    } else if (e.target.id === "password") {
      setPasswordInput(e.target.value);
    }
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Wrong Id or Password",
      life: 3000,
    });
  };

  const showEmptyError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Email or password cant be empty",
      life: 3000,
    });
  }

  return (
    <form className="authentication-form" onSubmit={handleLogin}>
      <Toast ref={toast} />
      <h1 className="authentication-title">Login</h1>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={emailInput}
        onChange={handleInputChange}
        autoComplete="username"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={passwordInput}
        onChange={handleInputChange}
        autoComplete="current-password"
      />
      {/* <Link className="forgot-password" to="/password/forgot">
        Forgot Password?
      </Link> */}
      <button
        className="authentication-button mt-2"
        disabled={isSubmitting}
        style={{ opactiy: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
      <span className="new-user">
        Not registered? <Link to="/register">Create an account</Link>
      </span>
    </form>
  );
}

export default Login;
