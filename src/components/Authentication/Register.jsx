import axios from "axios";
import "./Register.css";
import { useEffect, useRef, useState } from "react";

function Register() {
  const preset_key = "zrf4qj7i";
  const cloud_name = "dykebosio";
  const [image, setImage] = useState(
    "https://dummyimage.com/50x50/000/fff.jpg"
  );
  const [imageFile, setImageFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => console.log("success"))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  return (
    <form className="authentication-form">
      <h1 className="authentication-title">Register</h1>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
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
