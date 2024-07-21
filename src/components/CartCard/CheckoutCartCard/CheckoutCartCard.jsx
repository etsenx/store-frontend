import { AdvancedImage } from "@cloudinary/react";
import cld from "../../../utils/CloudinaryInstance";
import { fit } from "@cloudinary/url-gen/actions/resize";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../CartCard.css";
import "./CheckoutCartCard.css";

function CheckoutCartCard(props) {
  let productImage;
  if (props.item.image) {
    productImage = cld
      .image(props.item.image)
      .resize(fit().width(260).height(200));
  } else {
    productImage = cld
      .image("tripleshop/product-example")
      .resize(fit().width(260).height(200));
  }

  const total = props.item.quantity * props.item.price

  return (
    <div className="cart-card checkout-cart-card">
      <AdvancedImage cldImg={productImage} className="cart-card__image" />
      <div className="cart-card__product-name-container">
        <Link
          to={`/product/${props.item.productId}`}
          style={{ color: "black" }}
        >
          <h2 className="cart-card__product-name">{props.item.name}</h2>
        </Link>
      </div>
      <p className="cart-card__price">{props.item.quantity} x ${props.item.price} = ${total}</p>
    </div>
  );
}

CheckoutCartCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CheckoutCartCard;
