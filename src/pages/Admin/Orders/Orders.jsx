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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setOrdersCount(res.data.length);
      });
  }, []);

  const handleEditButton = (data) => {
    navigate(`/admin/orders/${data.id}/edit`);
  };

  const handleDeleteButton = async (data) => {
    try {
      const jwt = Cookies.get("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_API_URL}/order/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 204) {
        const updatedOrders = orders.filter((order) => order.id !== data.id);
        setOrders(updatedOrders);
        setOrdersCount(updatedOrders.length);
        showDeleteSuccess();
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.err("No Orders Found");
      }
    }
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
    });
  };

  const header = renderHeader();
  return (
    <div className="flex flex-column w-full">
      <Toast ref={toast} />
      <h2>Total Orders: {ordersCount}</h2>
      <DataTable
        value={orders}
        size="small"
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        header={header}
      >
        <Column field="id" header="ID" className="w-4" sortable />
        <Column
          field="paymentStatus"
          header="Payment Status"
          sortable
          className="w-3"
          body={(rowData) => (rowData.paymentStatus ? "PAID" : "NOT PAID")}
        />
        <Column
          field="orderStatus"
          header="Order Status"
          sortable
          className="w-3"
        />
        <Column
          className="w-2"
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

export default Orders;
