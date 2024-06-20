import "./OrderDetail.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { DataView } from "primereact/dataview";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import cld from "../../../../utils/CloudinaryInstance";
import { limitFill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

function OrderDetail() {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const jwt = Cookies.get("token");
      try {
        const order = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setDetail(order.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const details1 = detail
    ? [
        {
          key: "ID",
          value: id,
        },
        {
          key: "Status",
          value: detail.status,
        },
        {
          key: "Date",
          value: formatDate(detail.createdAt),
        },
      ]
    : [];

  const details2 = detail
    ? [
        {
          key: "Name",
          value: detail.shippingDetails.name,
        },
        {
          key: "Phone No",
          value: detail.shippingDetails.phoneNumber,
        },
        {
          key: "Address",
          value: detail.shippingDetails.address,
        },
      ]
    : [];

  const details3 = detail
    ? [
        {
          key: "Status",
          value: detail.paymentStatus ? "PAID" : "NOT PAID",
        },
        {
          key: "Method",
          value: detail.paymentMethod.toUpperCase(),
        },
        {
          key: "Stripe ID",
          value: "Nill",
        },
        {
          key: "Amount Paid",
          value: `$${detail.amount}`,
        },
      ]
    : [];

  const orderedItem = detail
    ? detail.orderedItems.map((item) => {
        return {
          title:
            item.productName.length > 100
              ? item.productName.substring(0, 100) + "..."
              : item.productName,
          price: `$${item.pricePerItem * item.quantity}`,
          qty: `${item.quantity}`,
          image: item.image,
          productId: item.productId
        };
      })
    : [];

  const itemTemplate = (item, index) => {
    const productImage = cld
      .image(item.image)
      .resize(limitFill().width(100).height(70));
    return (
      <div
        className="flex justify-content-around text-black-alpha-90 w-full mb-4"
        key={index}
      >
        <AdvancedImage cldImg={productImage} />
        <Link
          to={`/product/${item.productId}`}
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
          <Column
            body={(rowData) => (
              <span
                className={`${
                  rowData.key === "Status"
                    ? rowData.value === "Processing"
                      ? "text-red-500"
                      : rowData.value === "Shipped"
                      ? "text-yellow-500"
                      : rowData.value === "Delivered"
                      ? "text-green-500"
                      : "text-gray-500"
                    : ""
                }`}
              >
                {rowData.value}
              </span>
            )}
          ></Column>
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
          <Column
            body={(rowData) => (
              <span
                className={`${
                  rowData.key === "Status"
                    ? rowData.value === "PAID"
                      ? "text-green-500"
                      : "text-red-500"
                    : ""
                }`}
              >
                {rowData.value}
              </span>
            )}
          ></Column>
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
