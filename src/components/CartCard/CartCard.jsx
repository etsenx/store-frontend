import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartCard.css";

function CartCard() {
  return (
    <div className="cart-card">
      <img
        src="https://dummyimage.com/260x200/000/fff.jpg"
        className="cart-card__image"
      />
      <h2 className="cart-card__product-name">
        Bose QuietComfort 35 II Wireless Bluetooth Headphones
      </h2>
      <p className="cart-card__price">$299</p>
      <div className="cart-card__qty-button">
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
      </div>
      <button className="cart-card__cancel-button">
        <FontAwesomeIcon
          icon="fa-solid fa-trash"
          className="cart-card__cancel-icon"
        />
      </button>
    </div>
  );
}

export default CartCard;
