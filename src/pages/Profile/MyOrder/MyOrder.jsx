import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputText } from "primereact/inputtext";

import "./MyOrder.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function MyOrder() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();

  // Render dummy products data
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const handleViewDetail = (data) => {
    console.log(data.id);
    navigate(`/me/order/${data.id}`)
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
      <div className="test flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            className="p-inputtext-sm"
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="my-order-page">
      <DataTable
        value={products}
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
          field="price"
          sortable
          filterField="price"
          header="Amount"
        ></Column>
        <Column
          field="title"
          sortable
          filterField="title"
          header="Payment Status"
        ></Column>
        <Column
          field="stock"
          sortable
          filterField="stock"
          header="Order Status"
        ></Column>
        <Column
          field="actions"
          header="Actions"
          body={(rowData) => (
            <div>
              <button onClick={() => handleViewDetail(rowData)} className="my-order__action-button my-order__view-button">
                <FontAwesomeIcon
                  icon="fa-solid fa-eye"
                  style={{ color: "#FFFFFF" }}
                />
              </button>
              <button className="my-order__action-button my-order__print-button">
                <FontAwesomeIcon
                  icon="fa-solid fa-print"
                  style={{ color: "#FFFFFF" }}
                />
              </button>
            </div>
          )}
        ></Column>
      </DataTable>
      <div className="card"></div>
    </div>
  );
}

export default MyOrder;
