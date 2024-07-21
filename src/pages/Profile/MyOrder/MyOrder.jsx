import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import axios from "axios";
import Cookies from "js-cookie";

import "./MyOrder.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("token");
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/orders/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const handleViewDetail = (data) => {
    navigate(`/me/order/${data.id}`);
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

  const amountBodyTemplate = (rowData) => {
    return `$${rowData.amount}`;
  };

  const paymentStatusBodyTemplate = (rowData) => {
    return rowData.paymentStatus ? "PAID" : "NOT PAID";
  };

  const header = renderHeader();
  return (
    <div className="my-order-page">
      <DataTable
        value={orders}
        tableStyle={{ minWidth: "1280px" }}
        size="small"
        paginator
        showGridlines
        stripedRows
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        globalFilterFields={["id", "price", "title", "stock"]}
        header={header}
      >
        <Column field="id" sortable filterField="id" header="Order Id"></Column>
        <Column
          field="amount"
          sortable
          filterField="amount"
          header="Amount"
          body={amountBodyTemplate}
        ></Column>
        <Column
          field="paymentStatus"
          sortable
          filterField="paymentStatus"
          header="Payment Status"
          body={paymentStatusBodyTemplate}
        ></Column>
        <Column
          field="orderStatus"
          sortable
          filterField="orderStatus"
          header="Order Status"
        ></Column>
        <Column
          field="actions"
          header="Actions"
          body={(rowData) => (
            <div>
              <Button
                onClick={() => handleViewDetail(rowData)}
                className="my-order__action-button px-1 py-0"
                style={{ backgroundColor: "rgb(59 130 246)" }}
                icon={<FontAwesomeIcon icon="fa-solid fa-eye" size="sm" />}
              />
            </div>
          )}
        ></Column>
      </DataTable>
      <div className="card"></div>
    </div>
  );
}

export default MyOrder;
