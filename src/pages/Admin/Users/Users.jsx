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

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
        setUsersCount(res.data.length);
      });
  }, []);

  const handleEditButton = (data) => {
    navigate(`/admin/users/${data._id}/edit`);
  };

  const handleDeleteButton = (data) => {
    const jwt = Cookies.get("token");
    axios
      .delete(`${import.meta.env.VITE_REACT_API_URL}/users/delete/${data.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          const updatedUsers = users.filter((user) => user._id !== data._id);
          setUsers(updatedUsers);
          setUsersCount(updatedUsers.length);
          showSuccessDelete();
        }
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

  const header = renderHeader();
  return (
    <div className="flex flex-column w-full">
      <Toast ref={toast} />
      <h2>{usersCount} Users</h2>
      <DataTable
        value={users}
        size="small"
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        header={header}
      >
        <Column field="_id" header="ID" className="w-1" />
        <Column field="name" header="Name" sortable className="w-2" />
        <Column field="email" header="Email" className="w-4" />
        <Column field="privilege" header="Role" sortable className="w-2" />
        <Column
          className="w-4"
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

export default Users;
