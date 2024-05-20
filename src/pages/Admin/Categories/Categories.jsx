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

import Cookies from "js-cookie";

import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const toast = useRef();

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/categories/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      const categoriesWithIds = res.data.map((category, index) => ({
        ...category,
        id: index + 1,
      }));
      setCategories(categoriesWithIds);
      setCategoriesCount(categoriesWithIds.length);
    });
  }, []);

  const handleEditButton = (data) => {
    navigate(`/admin/categories/${data._id}/edit`);
  };

  const handleDeleteButton = (data) => {
    const jwt = Cookies.get("token");
    axios
      .delete(`${import.meta.env.VITE_REACT_API_URL}/category/${data._id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          const updatedUsers = categories.filter((category) => category._id !== data._id);
          setCategories(updatedUsers);
          setCategoriesCount(updatedUsers.length);
          showSuccessDelete();
        }
      });
  }

  const confirmDelete = (data) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => handleDeleteButton(data),
    });
  };

  const showSuccessDelete = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Deleted Successfully",
      life: 3000,
    });
  };

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

  const header = renderHeader();
  return (
    <div className="flex flex-column w-full">
      <Toast ref={toast} />
      <h2>Total categories: {categoriesCount}</h2>
      <DataTable
        value={categories}
        size="small"
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        header={header}
      >
        <Column field="id" header="ID" className="w-1" />
        <Column field="name" header="Nama" sortable className="w-7" />
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

export default Categories;
