import axios from "axios";
import "./Register.css";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://dummyimage.com/50x50/000/fff.jpg"
  );
  const [imageFile, setImageFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(e) {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "name") {
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
    if (!imageFile) {
      console.log("please upload file");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost:3000/register", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  return (
    <form className="authentication-form">
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
            aria-label="File browser example"
            accept="image/*"
            onChange={handleFile}
          />
          <span className="file-custom"></span>
        </label>
        {/* <UploadWidget /> */}
      </div>
      <button
        className="authentication-button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
