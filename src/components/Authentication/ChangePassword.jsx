import axios from "axios";
import { useRef, useState } from "react";

import Cookies from "js-cookie";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function ChangePassword() {
  const toast = useRef(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");

  function handleChange(e) {
    if (e.target.id === "old-password") {
      setOldPassword(e.target.value);
    } else if (e.target.id === "new-password") {
      setNewPassword(e.target.value);
    } else if (e.target.id === "verify-new-password") {
      setVerifyNewPassword(e.target.value);
    }
  }

  function handleSubmit() {
    if (newPassword !== verifyNewPassword) {
      showVerifyPassErr();
      return;
    }
    if (oldPassword === newPassword) {
      showSamePassErr();
      return;
    }
    const jwt = Cookies.get("token");
    console.log(import.meta.env.VITE_REACT_API_URL);
    axios
      .patch(
        `${import.meta.env.VITE_REACT_API_URL}/users/change-password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          showSuccess();
        }
      })
      .catch((err) => {
        const errorResponse = JSON.parse(err.request.response);
        if (errorResponse.message === "Incorrect Password") {
          showIncorrectPassErr();
        }
      });
  }

  const confirm = (e) => {
    e.preventDefault();
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: handleSubmit,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Password Changed",
      life: 3000,
    });
  };

  const showVerifyPassErr = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Password Doesn't Match",
      life: 3000,
    });
  };

  const showIncorrectPassErr = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Incorrect Password",
      life: 3000,
    });
  };

  const showSamePassErr = () => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail: "Password cannot be the same as previous one",
      life: 3000,
    });
  };

  return (
    <form className="authentication-form" onSubmit={confirm}>
      <Toast ref={toast} />
      <h1 className="authentication-title">Change Password</h1>
      <label htmlFor="old-password">Old Password</label>
      <input
        id="old-password"
        type="password"
        value={oldPassword}
        onChange={handleChange}
      />
      <label htmlFor="new-password">New Password</label>
      <input
        id="new-password"
        type="password"
        value={newPassword}
        onChange={handleChange}
      />
      <label htmlFor="verify-new-password">Verify New Password</label>
      <input
        id="verify-new-password"
        type="password"
        value={verifyNewPassword}
        onChange={handleChange}
      />
      <button className="authentication-button" style={{ marginTop: "20px" }}>
        Change Password
      </button>
      <ConfirmDialog draggable={false} />
    </form>
  );
}

export default ChangePassword;
