import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdvancedImage } from "@cloudinary/react";
import cld from "../../utils/CloudinaryInstance";
import { fit } from "@cloudinary/url-gen/actions/resize";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../redux/cart/cartService";
import "./CartCard.css";

function CartCard(props) {
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

  const dispatch = useDispatch();

  const reduceQty = () => {
    dispatch(updateCartItem(props.item.productId, props.item.quantity - 1))
  }

  const increaseQty = () => {
    dispatch(updateCartItem(props.item.productId, props.item.quantity + 1))
  }

  const removeItem = () => {
    dispatch(removeFromCart(props.item.productId))
  }

  return (
    <div className="cart-card">
      <AdvancedImage cldImg={productImage} className="cart-card__image" />
      <div className="cart-card__product-name-container">
        <Link
          to={`/product/${props.item.productId}`}
          style={{ color: "black" }}
        >
          <h2 className="cart-card__product-name">{props.item.name}</h2>
        </Link>
      </div>
      <p className="cart-card__price">${props.item.price}</p>
      <div className="cart-card__qty-button">
        <button
          className="product-page-quantity-button"
          style={{ backgroundColor: "#dc3545" }}
          onClick={reduceQty}
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
          onClick={increaseQty}
        >
          {" "}
          +{" "}
        </button>
      </div>
      <button className="cart-card__cancel-button" onClick={removeItem}>
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
