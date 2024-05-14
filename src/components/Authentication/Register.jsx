import "./Register.css";

import axios from "axios";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";

import { login } from "../../redux/authSlice";

import { Toast } from "primereact/toast";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://dummyimage.com/50x50/000/fff.jpg"
  );
  const [imageFile, setImageFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

  function handleInputChange(e) {
    const nameRegex = /[^A-Za-z]/;
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "name" && !nameRegex.test(e.target.value)) {
      setName(e.target.value);
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        setImage(fileReader.result);
        setImageFile(file);
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${import.meta.env.VITE_REACT_API_URL}/register`, formData)
      .then(() => {
        axios
          .post(`${import.meta.env.VITE_REACT_API_URL}/login`, {
            email: email,
            password: password,
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
              });
            navigate("/");
          });
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "User Already Exist",
      life: 3000,
    });
  };

  return (
    <form className="authentication-form" onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <h1 className="authentication-title">Register</h1>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        required
        onChange={handleInputChange}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        autoComplete="username"
        required
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        name="password"
        autoComplete="current-password"
        required
        onChange={handleInputChange}
      />
      <label htmlFor="avatar">Avatar</label>
      <div className="register-avatar-upload-container">
        <img src={image} alt="Avatar" className="register-avatar" />
        <label className="file">
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFile}
            required
          />
          <span className="file-custom"></span>
        </label>
      </div>
      <button
        className="authentication-button"
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
