import "./MyOrder.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

function MyOrder() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  return (
    <div className="my-order-page">
      <DataTable
        value={products}
        tableStyle={{ minWidth: "1280px"}}
        size="large"
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
      >
        <Column field="id" header="Order Id"></Column>
        <Column field="price" header="Amount"></Column>
        <Column field="title" header="Payment Status"></Column>
        <Column field="stock" header="Order Status"></Column>
        <Column field="actions" header="Actions" body={(rowData) => (
          <div>
      <button onClick={() => handleView(rowData)}>View</button>
      <button onClick={() => handlePrint(rowData)}>Print</button>
    </div>
        )}></Column>
      </DataTable>
      <div className="card">
      </div>
    </div>
  );
}

export default MyOrder;
