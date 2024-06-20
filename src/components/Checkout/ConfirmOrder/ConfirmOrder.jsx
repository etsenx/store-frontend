import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/cart/cartSlice";
import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import CheckoutCartCard from "../../CartCard/CheckoutCartCard/CheckoutCartCard";
import "./ConfirmOrder.css";
import { selectAuth } from "../../../redux/auth/authSlice";

function ConfirmOrder({ shippingInfo, onNext }) {
  const { user } = useSelector(selectAuth);
  const { items } = useSelector(selectCart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (items.length > 0) {
      const getProducts = async () => {
        try {
          const jwt = Cookies.get("token");
          const filterIds = items.map((item) => item.productId);
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_API_URL}/products/id`,
            filterIds,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const combinedItems = items.map((item) => {
            const matchingProduct = response.data.find(
              (product) => product._id === item.productId
            );

            let primaryImage = matchingProduct.images.find(
              (image) => image.isPrimary === true
            );
            if (!primaryImage) {
              primaryImage = matchingProduct.images[0];
            }

            return {
              cartId: item._id,
              productId: matchingProduct._id,
              quantity: item.quantity,
              name: matchingProduct.name,
              price: matchingProduct.price,
              image: primaryImage ? primaryImage.link : null,
              description: matchingProduct.description,
            };
          });
          setProducts(combinedItems);
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      };
      getProducts();
    }
  }, [items]);

  const handleNext = (e) => {
    e.preventDefault();
    onNext({ amount: grandTotal });
  };

  const priceTotal = useMemo(() => {
    if (products.length > 0) {
      const total = products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return parseFloat(total.toFixed(2));
    }
    return 0;
  }, [products]);

  const tax = useMemo(() => {
    const taxTotal = priceTotal * 0.1;
    return parseFloat(taxTotal.toFixed(2));
  }, [priceTotal]);

  const grandTotal = useMemo(() => {
    const total = priceTotal + tax;
    return parseFloat(total.toFixed(2));
  }, [priceTotal, tax]);

  return (
    <div className="cart-page confirm-order">
      <div className="cart-page__content mt-5">
        <div className="flex flex-column gap-0 mt-0">
          <>
            <h2 className="title cart-page__title ml-0 text-2xl mb-0 mt-0">
              Shipping Info
            </h2>
            <div className="cart-page-shipping-info ml-5">
              <p>Name: {user.name}</p>
              <p>Phone: {shippingInfo.phoneNumber}</p>
              <p>
                Address: {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.zipCode}, {shippingInfo.country}
              </p>
            </div>
            <hr />
          </>
          <>
            <h2 className="title cart-page__title ml-0 mt-3 text-2xl">
              Your Cart Items:
            </h2>
            <div className="cart-list">
              {products &&
                products.map((item) => (
                  <CheckoutCartCard key={item.productId} item={item} />
                ))}
            </div>
          </>
        </div>
        <div className="cart-checkout">
          <h2 className="cart-checkout__title">Order Summary</h2>
          <hr />
          <div className="cart-checkout__details">
            <div className="cart-checkout__detail">
              <span>SubTotal:</span>
              <span>${priceTotal}</span>
            </div>
            <div className="cart-checkout__detail">
              <span>Shipping:</span>
              <span>$0</span>
            </div>
            <div className="cart-checkout__detail">
              <span>Tax:</span>
              <span>${tax}</span>
            </div>
            <hr />
            <div className="cart-checkout__detail mt-3">
              <span>Total:</span>
              <span>${grandTotal}</span>
            </div>
          </div>
          <hr />
          <Button className="cart-checkout__button" onClick={handleNext}>
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

ConfirmOrder.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ConfirmOrder;
