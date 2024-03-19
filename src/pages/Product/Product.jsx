import { useState } from "react";

import ReviewStars from "../../components/ReviewStars/ReviewStars";
import Reviews from "../../components/Reviews/Reviews";
import Button from "../../components/Button/Button";

import "./Product.css";


function Product() {
  const [stockStatus, setStockStatus] = useState(false);
  return (
    <>
      <div className="product-page">
        <div className="product-page-container">
          <img
            src="https://dummyimage.com/600x600/000/fff.jpg"
            width={600}
            height={600}
          />
          <div className="product-page-detail">
            <h1 className="product-page-title">
              CAN USB FD Adapter (GC-CAN-USB-FD)
            </h1>
            <p className="product-page-product-id">
              Product # 5b4235b435bbewrwe65
            </p>
            <hr />
            <p className="product-page-rating">
              <ReviewStars />{" "}
              <span className="product-page-rating-text">(0 Reviews)</span>
            </p>
            <hr />
            <p className="product-page-price">$315</p>
            <div className="product-page-quantity">
              <button
                className="product-page-quantity-button"
                style={{ backgroundColor: "#dc3545" }}
              >
                {" "}
                -{" "}
              </button>
              <span className="product-page-quantity-text">1</span>
              <button
                className="product-page-quantity-button"
                style={{ backgroundColor: "#007bff" }}
              >
                {" "}
                +{" "}
              </button>
              <Button className="product-page-add" disabled>
                Add to Cart
              </Button>
            </div>
            <hr />
            <p style={{ margin: "25px 0" }}>
              Status:{" "}
              <span
                className="product-page-stock"
                style={
                  stockStatus ? { color: "#28a745" } : { color: "#dc3545" }
                }
              >
                {stockStatus ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <hr />
            <div className="produt-page-description">
              <h2 className="product-page-description-title">Description:</h2>
              <p className="product-page-description-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry{"'"}s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <hr />
            <p>
              Sold by: <span className="product-page-seller-name">Amazon</span>
            </p>
            <Button className="product-page-submit-review">
              Submit your Review
            </Button>
          </div>
        </div>
        <div className="product-page-review">
          <h2 className="product-page-review-heading">Other{"'"}s Reviews:</h2>
          <hr />
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default Product;
