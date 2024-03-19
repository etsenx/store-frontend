import "./OrderDetail.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function OrderDetail() {
  const products = [
    {
      key: "ID",
      value: "12312512",
    },
    {
      key: "Status",
      value: "Processing",
    },
    {
      key: "Date",
      value: "10/4/2023, 11:40:19 AM"
    }
  ];

  return (
    <div className="order-detail-page">
      <div className="order-detail">
        <h2 className="">Your Order Details</h2>
        <DataTable
          value={products}
          showGridlines
          className="no-header-datatable"
          style={{ marginTop: '20px', marginBottom: '50px' }}
          rowClassName="order-table__background"
        >
          <Column field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
      <div className="order-detail">
        <h2 className="">Shipping Info</h2>
        <DataTable
          value={products}
          showGridlines
          className="no-header-datatable"
          style={{ marginTop: '20px', marginBottom: '50px' }}
          rowClassName="order-table__background"
        >
          <Column field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
      <div className="order-detail">
        <h2 className="">Payment Info</h2>
        <DataTable
          value={products}
          showGridlines
          className="no-header-datatable"
          style={{ marginTop: '20px', marginBottom: '50px' }}
          rowClassName="order-table__background"
        >
          <Column field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default OrderDetail;
