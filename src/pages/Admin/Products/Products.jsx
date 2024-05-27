import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Products.css";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}/products`)
      .then((res) => {console.log(res.data)
        const productsWithIds = res.data.map((product, index) => ({
          ...product,
          id: index + 1,
          shortenName: shortenProductName(product.name, 50)
        }));
        console.log(productsWithIds);
        setProducts(productsWithIds);
      });
  }, []);

  const shortenProductName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength - 3) + "...";
    }
    return name;
  }

  const handleEditButton = (data) => {
    console.log(data);
    // navigate(`/admin/products/${data.id}/edit`);
  };

  const handleEditImageButton = (data) => {
    navigate(`/admin/products/${data.id}/edit-image`);
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
      <h2>Total Products: 10</h2>
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
                // onClick={() => handleViewDetail(rowData)}
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
    </div>
  );
}

export default Products;
