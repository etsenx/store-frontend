import Button from "../Button/Button";

import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import cld from "../../utils/CloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

function UpdateProfile() {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(cld.image(user.avatar).toURL());
  const [imageFile, setImageFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(e) {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
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

    axios
      .post("http://localhost:3000/users/change-profile", formData)
      .then(() => {});
  }

  return (
    <form className="authentication-form" onSubmit={handleSubmit}>
      <h2 className="authentication-title">Update Profile</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="avatar">Avatar</label>
      <div className="register-avatar-upload-container">
        <img src={image} alt="Avatar" className="register-avatar" />
        <label
          type="file"
          id="file"
          className="file"
          accept="image/*"
          onChange={handleFile}
          required
        >
          <input type="file" id="file" aria-label="File browser example" />
          <span className="file-custom"></span>
        </label>
      </div>
      <Button className="authentication-button" isDisabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Update"}
      </Button>
    </form>
  );
}

export default UpdateProfile;
