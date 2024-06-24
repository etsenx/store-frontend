import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdvancedImage } from "@cloudinary/react";
import cld from "../../utils/CloudinaryInstance";
import { fit } from "@cloudinary/url-gen/actions/resize";
import PropTypes from "prop-types";
import "./CartCard.css";
import { Link } from "react-router-dom";

function CartCard(props) {
  console.log(props);
  const productImage = cld
    .image(props.item.image.link)
    .resize(fit().width(260).height(200));
  return (
    <div className="cart-card">
      <AdvancedImage cldImg={productImage} className="cart-card__image" />
      <div className="cart-card__product-name-container">
        <Link to={`/product/${props.item._id}`} style={{ color: "black" }}>
          <h2 className="cart-card__product-name">{props.item.name}</h2>
        </Link>
      </div>
      <p className="cart-card__price">${props.item.price}</p>
      <div className="cart-card__qty-button">
        <button
          className="product-page-quantity-button"
          style={{ backgroundColor: "#dc3545" }}
        >
          {" "}
          -{" "}
        </button>
        <span className="product-page-quantity-text">
          {props.item.quantity}
        </span>
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
          style={{ color: "#dc3545" }}
        />
      </button>
    </div>
  );
}

CartCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartCard;
