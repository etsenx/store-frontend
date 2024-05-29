import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import Button from "../../../../components/Button/Button";

function Edit() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [initialData, setInitialData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCategory(res.data.name);
          setInitialData(res.data.name);
        }
      });
  }, [id]);

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
    try {
      if (category === "") {
        showEmptyError();
        return;
      }
      if (category === initialData) {
        showNoChangeError();
        return;
      }
      const jwt = Cookies.get("token");
      await axios.patch(
        `${import.meta.env.VITE_REACT_API_URL}/category/${id}`,
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
      if (
        err.response &&
        err.response.data.message === "Category already exists"
      ) {
        showAlreadyExistError();
      } else {
        console.err(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Category Updated",
      life: 3000,
    });
  };

  const showNoChangeError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "No Change Made",
      life: 3000,
    });
  };

  const showEmptyError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Input is empty",
      life: 3000,
    });
  };

  const showAlreadyExistError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Category already exists",
      life: 3000,
    });
  };

  return (
    <div className="w-5">
      <form className="add-product-form mx-auto w-6" onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <h1 className="add-product-title">Edit Category</h1>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
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
