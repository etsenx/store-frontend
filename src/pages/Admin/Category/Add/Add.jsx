import { useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import axios from "axios";

import Cookies from "js-cookie";

import Button from "../../../../components/Button/Button";

function Add() {
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

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

  const acceptSubmit = async () => {
    setIsSubmitting(true);
    if (category === "") {
      console.log("empty");
    }
    const jwt = Cookies.get("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/category/add`,
        {
          name: category,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      showSuccess();
    } catch (err) {
      if (err.response && err.response.data.message) {
        showError();
      } else {
        console.error(
          "Error adding category:",
          err.response ? err.response.data : err.message
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Category added successfully",
      life: 3000,
    })
  }

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Category already exists",
      life: 3000
    })
  }

  return (
    <div className="w-full">
      <form className="add-product-form ml-5" onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <h1 className="add-product-title">New Category</h1>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          required
        />
        <Button
          className="add-product-button mt-3"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.6 : 1 }}
        >
          {isSubmitting ? "Loading..." : "Create"}
        </Button>
        <ConfirmDialog draggable={false} />
      </form>
    </div>
  );
}

export default Add;
