import { useCallback, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import Cookies from "js-cookie";

import axios from "axios";

import Button from "../../../../components/Button/Button";

function Edit() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [initialData, setInitialData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

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
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setInitialData(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setStock(res.data.stock);
        setSellerName(res.data.seller);
        const matchedCategory = categories.find(
          (category) => category.code === res.data.category
        );
        setSelectedCategory(matchedCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmSubmit();
  }

  const confirmSubmit = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: acceptSubmit,
    });
  }

  const acceptSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (
        name === initialData.name &&
        description === initialData.description &&
        price === initialData.price &&
        stock === initialData.stock &&
        sellerName === initialData.seller &&
        selectedCategory.code === initialData.category
      ) {
        showNoChangeError();
        return;
      }
      const jwt = Cookies.get("token");
      const response = await axios.patch(`${import.meta.env.VITE_REACT_API_URL}/product/${id}/edit`, {
        name,
        description,
        price,
        stock,
        category: selectedCategory.code,
        seller: sellerName
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      if (response.status === 200) {
        setInitialData(response.data);
        showSuccess();
      }
    } catch(err) {
      console.log(err);
    }finally {
      setIsSubmitting(false);
    }
  }

  const showNoChangeError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "No Change Made",
      life: 3000,
    });
  }

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Products Detail Updated",
      life: 3000,
    });
  };

  return (
    <div className="w-full">
      <Toast ref={toast} />
      <form className="add-product-form ml-5" onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  console.log(e.value);
                  setSelectedCategory(e.value);
                }}
              />
            </div>
          </div>
          <div className="col-6 flex flex-column">
            <label htmlFor="product-seller">Seller Name</label>
            <InputText
              id="product-seller"
              className="p-inputtext-sm p-0"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="add-product-button mt-3"
          style={{ opacity: isSubmitting ? 0.6 : 1 }}
          isDisabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Update"}
        </Button>
        <ConfirmDialog draggable={false} />
      </form>
    </div>
  );
}

export default Edit;
