import Button from "../Button/Button";

import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";

import axios from "axios";

import cld from "../../utils/CloudinaryInstance";

import Cookies from "js-cookie";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(cld.image(user.avatar).toURL());
  const [imageFile, setImageFile] = useState();
  const [hasAvatarChanged, setHasAvatarChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

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
    if (name === user.name && email === user.email && !hasAvatarChanged) {
      showError();
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
      .patch(
        `${import.meta.env.VITE_REACT_API_URL}/users/change-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        dispatch(login(res.data));
        showSuccess();
      })
      .catch((err) => {
        const errorResponse = JSON.parse(err.request.response);
        if (errorResponse.message === "User already exists") {
          showUserExistError();
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Profile Updated",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "No Change Made",
      life: 3000,
    });
  };

  const showUserExistError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail:
        "Email is already in use. Please choose a different email address",
      life: 3000,
    });
  };

  return (
    <form className="authentication-form" onSubmit={handleSubmit}>
      <Toast ref={toast} />
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
      <Button
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
        className="authentication-button"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Update"}
      </Button>
      <ConfirmDialog draggable={false} />
    </form>
  );
}

export default UpdateProfile;
