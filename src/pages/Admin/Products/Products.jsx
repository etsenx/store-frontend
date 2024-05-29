import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

import Cookies from "js-cookie";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/products`)
      .then((res) => {
        const productsWithIds = res.data.map((product, index) => ({
          ...product,
          id: index + 1,
          shortenName: shortenProductName(product.name, 50)
        }));
        setProducts(productsWithIds);
        setProductsCount(productsWithIds.length);
      });
  }, []);

  const shortenProductName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength - 3) + "...";
    }
    return name;
  }

  const handleEditButton = (data) => {
    navigate(`/admin/products/${data._id}/edit`);
  };

  const handleEditImageButton = (data) => {
    navigate(`/admin/products/${data._id}/edit-image`);
  };

  const handleDeleteButton = async (data) => {
    try {
      const jwt = Cookies.get("token");
      const response = await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/product/${data._id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      if (response.status === 204) {
        const updatedProducts = products.filter((product) => product._id !== data._id);
        setProducts(updatedProducts);
        setProductsCount(updatedProducts.length);
        showDeleteSuccess();
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.err("No Product Found");
      }
    }
  }

  const confirmDelete = (data) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => handleDeleteButton(data),
    });
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              className="p-inputtext-sm"
              placeholder="Keyword Search"
            />
          </IconField>
        </span>
      </div>
    );
  };

  const showDeleteSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product successfully deleted",
      life: 3000,
    })
  }

  const header = renderHeader();
  return (
    <div className="flex flex-column w-full">
      <Toast ref={toast} />
      <h2>Total Products: {productsCount}</h2>
      <DataTable
        value={products}
        size="small"
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        header={header}
      >
        <Column field="id" header="ID" className="w-1" sortable />
        <Column field="shortenName" header="Nama" sortable className="w-7" />
        <Column field="stock" header="Stock" sortable className="w-1" />
        <Column
          className="w-3"
          field="actions"
          header="Actions"
          body={(rowData) => (
            <>
              <Button
                onClick={() => handleEditButton(rowData)}
                className="products__action-button px-1 py-0"
                style={{ backgroundColor: "rgb(59 130 246)" }}
                icon={<FontAwesomeIcon icon="fa-solid fa-pencil" size="sm" />}
              />
              <Button
                onClick={() => handleEditImageButton(rowData)}
                className="products__action-button px-1 py-0"
                style={{ backgroundColor: "rgb(5 150 105)" }}
                icon={<FontAwesomeIcon icon="fa-regular fa-image" size="sm" />}
              />
              <Button
                onClick={() => confirmDelete(rowData)}
                className="products__action-button px-1 py-0"
                style={{ backgroundColor: "#ef4444" }}
                icon={
                  <FontAwesomeIcon icon="fa-solid fa-trash-can" size="sm" />
                }
              />
            </>
          )}
        />
      </DataTable>
      <ConfirmDialog draggable={false} />
    </div>
  );
}

export default Products;
