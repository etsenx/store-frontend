import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cart/cartSlice";

import axios from "axios";
import Cookies from "js-cookie";

import Button from "../../components/Button/Button";
import CartCard from "../../components/CartCard/CartCard";
import "./Cart.css";

function Cart() {
  const { items, itemCount } = useSelector(selectCart);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-page">
      {items && items.length === 0 ? (
        <h1 className="title cart-page__title">No items found</h1>
      ) : (
        <>
          <h1 className="title cart-page__title">
            Your Cart: {itemCount} Items
          </h1>
          <div className="cart-page__content">
            <div className="cart-list">
              {products &&
                products.map((item) => (
                  <CartCard key={item.productId} item={item} />
                ))}
            </div>
            <div className="cart-checkout">
              <h2 className="cart-checkout__title">Order Summary</h2>
              <hr />
              <div className="cart-checkout__details">
                <div className="cart-checkout__detail">
                  <span>Units:</span>
                  <span>{itemCount} (Units)</span>
                </div>
                <div className="cart-checkout__detail">
                  <span>Est. total:</span>
                  <span>${priceTotal}</span>
                </div>
              </div>
              <hr />
              <Button
                className="cart-checkout__button"
                onClick={handleCheckout}
              >
                Check out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
