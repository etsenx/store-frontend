import "./OrderDetail.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { DataView } from "primereact/dataview";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OrderDetail() {
  const details1 = [
    {
      key: "ID",
      value: "65f8d580916f6f81cd61f75e",
    },
    {
      key: "Status",
      value: "Processing",
    },
    {
      key: "Date",
      value: "10/4/2023, 11:40:19 AM",
    },
  ];

  const details2 = [
    {
      key: "Name",
      value: "Steven Steven",
    },
    {
      key: "Phone No",
      value: "082230307777",
    },
    {
      key: "Address",
      value: "Jl Rumah No 55 Sei Rumah Raya",
    },
  ];

  const details3 = [
    {
      key: "Status",
      value: "Not Paid",
    },
    {
      key: "Method",
      value: "COD",
    },
    {
      key: "Stripe ID",
      value: "Nill",
    },
    {
      key: "Amount Paid",
      value: "$1084.32",
    },
  ];

  const orderedItem = [
    {
      title: "Bose QuietComfort 35 II Wireless Bluetooth Headphones",
      price: "$315",
      qty: "2",
      image: "https://dummyimage.com/260x200/000/fff.jpg",
    },
    {
      title: "Iphone 16 Pro",
      price: "$2015",
      qty: "5",
      image: "https://dummyimage.com/260x200/000/fff.jpg",
    },
    {
      title: "Monitor AOC",
      price: "$99",
      qty: "1",
      image: "https://dummyimage.com/260x200/000/fff.jpg",
    },
  ];

  const itemTemplate = (item, index) => {
    return (
      <div
        className="flex justify-content-around text-black-alpha-90 w-full"
        key={index}
      >
        <Image src={item.image} alt={item.title} width="100px" height="70px" />
        <Link
          to="/product/id"
          className="w-5 text-black-alpha-50 underline font-semibold my-auto"
        >
          <span>{item.title}</span>
        </Link>
        <p className="my-auto text-900 w-1 font-semibold">{item.price}</p>
        <p className="my-auto text-900 w-6rem font-semibold">
          {item.qty} Piece(s)
        </p>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="flex flex-column">{list}</div>;
  };

  return (
    <div className="order-detail-page relative">
      <Button
        className="absolute right-0"
        label="Invoice"
        size="small"
        style={{ background: "rgb(5 150 105)", borderColor: "rgb(5 150 105)", top: "-10px" }}
        icon={
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon="fa-solid fa-print"
          />
        }
      />
      <div className="order-detail">
        <h2 className="">Your Order Details</h2>
        <DataTable
          value={details1}
          size="small"
          showGridlines
          className="no-header-datatable"
          style={{
            marginTop: "20px",
            marginBottom: "50px",
          }}
          rowClassName="order-table__row"
        >
          <Column style={{ width: "180px" }} field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
      <div className="order-detail">
        <h2 className="">Shipping Info</h2>
        <DataTable
          value={details2}
          size="small"
          showGridlines
          className="no-header-datatable"
          style={{ marginTop: "20px", marginBottom: "50px" }}
          rowClassName="order-table__row"
        >
          <Column style={{ width: "100px" }} field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
      <div className="order-detail">
        <h2 className="">Payment Info</h2>
        <DataTable
          value={details3}
          size="small"
          showGridlines
          className="no-header-datatable"
          style={{ marginTop: "20px", marginBottom: "50px" }}
          rowClassName="order-table__row"
        >
          <Column style={{ width: "300px" }} field="key"></Column>
          <Column field="value"></Column>
        </DataTable>
      </div>
      <div className="order-items">
        <h2>Order Items:</h2>
        <Divider />
        <DataView
          className="w-full"
          value={orderedItem}
          listTemplate={listTemplate}
        />
        <Divider />
      </div>
    </div>
  );
}

export default OrderDetail;
