import Button from "../Button/Button";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";

import axios from "axios";

import cld from "../../utils/CloudinaryInstance";

import Cookies from "js-cookie";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(cld.image(user.avatar).toURL());
  const [imageFile, setImageFile] = useState();
  const [hasAvatarChanged, setHasAvatarChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleInputChange(e) {
    const nameRegex = /[^A-Za-z]/;
    if (e.target.id === "name" && !nameRegex.test(e.target.value)) {
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
        setHasAvatarChanged(true);
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    confirm1();
  }

  const accept = () => {
    setIsSubmitting(true);
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    if (name === user.name && email === user.email && !hasAvatarChanged) {
      setShowErrorMessage(true);
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("previousAvatar", user.avatar);
    const jwt = Cookies.get("token");
    axios
      .patch("http://localhost:3000/users/change-profile", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch(login(res.data));
        setShowSuccessMessage(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // const reject = () => {
  //   toast.current.show({
  //     severity: "warn",
  //     summary: "Rejected",
  //     detail: "You have rejected",
  //     life: 3000,
  //   });
  // };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      // reject
    });
  };

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
      <div
        className={`mx-auto -mt-4 mb-2 justify-content-center ${
          showSuccessMessage ? "flex" : "hidden"
        }`}
      >
        <span className="text-green-500 inline-block mx-auto text-sm">
          Updated Successfully
        </span>
      </div>
      <div
        className={`mx-auto -mt-4 mb-2 justify-content-center ${
          showErrorMessage ? "flex" : "hidden"
        }`}
      >
        <span className="text-red-500 inline-block mx-auto text-sm">
          No Change Made
        </span>
      </div>
      <Button
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
        className="authentication-button"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Update"}
      </Button>
      <ConfirmDialog />
    </form>
  );
}

export default UpdateProfile;
