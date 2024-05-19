import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import Button from "../../../../components/Button/Button";

function Edit() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [initialData, setInitialData] = useState({
    email: "",
    name: "",
    selectedRole: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roles = useMemo(
    () => [
      { name: "User", code: "user" },
      { name: "Admin", code: "admin" },
    ],
    []
  );
  const toast = useRef(null);
  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const fetchedRole =
            roles.find((role) => role.code === res.data.privilege) || null;
          setEmail(res.data.email);
          setName(res.data.name);
          setSelectedRole(fetchedRole);
          setInitialData({
            email: res.data.email,
            name: res.data.name,
            selectedRole: fetchedRole,
          });
        }
      });
  }, [id, roles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmSubmit();
  };

  const confirmSubmit = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: acceptSubmit,
    });
  };

  const acceptSubmit = () => {
    setIsSubmitting(true);
    if (
      name === initialData.name &&
      email === initialData.email &&
      selectedRole.code === initialData.selectedRole.code
    ) {
      showError();
      setIsSubmitting(false);
      return;
    }
    const jwt = Cookies.get("token");
    axios
      .patch(
        `${import.meta.env.VITE_REACT_API_URL}/users/change-profile/${id}`,
        {
          name,
          email,
          privilege: selectedRole.code,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const fetchedRole =
            roles.find((role) => role.code === res.data.privilege) || null;
          setEmail(res.data.email);
          setName(res.data.name);
          setSelectedRole(fetchedRole);
          setInitialData({
            email: res.data.email,
            name: res.data.name,
            selectedRole: fetchedRole,
          });
          showSuccess();
        }
      })
      .catch((err) => {
        if (err) {
          if (err.response.data.message === "Email already exists") {
            showUserExistsError();
          }
        }
      })
      .finally(() => {
        setIsSubmitting(false);
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

  const showUserExistsError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "User already exists",
      life: 3000
    })
  }

  return (
    <div className="w-5">
      <form className="add-product-form mx-auto w-6" onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <h1 className="add-product-title">Edit User</h1>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="product-name">Email</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">User Role</label>
        <Dropdown
          className="p-0 product-dropdown w-full mb-3"
          options={roles}
          optionLabel="name"
          placeholder="Select Role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.value)}
        />
        <Button
          style={{ opactiy: isSubmitting ? 0.6 : 1 }}
          className="add-product-button mt-3"
          isDisabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Update"}
        </Button>
      </form>
      <ConfirmDialog draggable={false} />
    </div>
  );
}

export default Edit;
