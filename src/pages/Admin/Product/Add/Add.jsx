import { useCallback, useEffect, useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import Button from "../../../../components/Button/Button";

import axios from "axios";

import Cookies from "js-cookie";

import "./Add.css";

function Add() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef();

  const getCategories = useCallback(async () => {
    const jwt = Cookies.get("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const categories = response.data.map((category) => ({
        name: category.name,
        code: category._id,
      }));
      setCategories(categories);
      console.log("run");
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
      const jwt = Cookies.get("token");
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/product/add`,
        {
          name,
          description,
          price,
          stock,
          category: selectedCategory.code,
          seller: sellerName,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);
      showSuccess();
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        showError();
      }
    }
      finally {
      setIsSubmitting(false);
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product added successfully",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Product already exists",
      life: 3000,
    });
  };

  return (
    <div className="w-full">
      <form className="add-product-form ml-5" onSubmit={handleSubmit}>
        <Toast ref={toast} />
        <h1 className="add-product-title">New Product</h1>
        <label htmlFor="product-name">Name</label>
        <InputText
          id="product-name"
          type="text"
          className="p-inputtext-sm p-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="product-description">Description</label>
        <InputTextarea
          id="product-description"
          className="w-full p-0"
          cols={5}
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid mt-3">
          <div className="col-6 flex flex-column">
            <label htmlFor="product-price">Price</label>
            <InputNumber
              inputId="product-price"
              inputClassName="p-inputtext-sm p-0"
              mode="currency"
              currency="USD"
              locale="en-US"
              value={price}
              onChange={(e) => setPrice(e.value)}
            />
          </div>
          <div className="col-6 flex flex-column">
            <label htmlFor="product-stock">Stock</label>
            <InputNumber
              inputClassName="p-inputtext-sm p-0"
              inputId="product-stock"
              value={stock}
              onChange={(e) => setStock(e.value)}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-6 flex flex-column">
            <label htmlFor="product-category">Category</label>
            <div className="w-full product-dropdown">
              <Dropdown
                className="p-0 product-dropdown w-full"
                options={categories}
                optionLabel="name"
                placeholder="Select Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.value)}
              />
            </div>
          </div>
          <div className="col-6 flex flex-column">
            <label htmlFor="product-seller">Seller Name</label>
            <InputText
              id="product-seller"
              className="p-inputtext-sm p-0"
              value={sellerName}
              onChange={(e) => {
                setSellerName(e.target.value);
              }}
            />
          </div>
        </div>
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
