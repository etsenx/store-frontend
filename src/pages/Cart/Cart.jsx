import { useEffect, useState } from "react";

import {  useSelector } from "react-redux";
import { selectCart } from "../../redux/cart/cartSlice";

import { v4 as uuidv4 } from "uuid";

import Button from "../../components/Button/Button";
import CartCard from "../../components/CartCard/CartCard";
import "./Cart.css";

function Cart() {
  const { items, itemCount } = useSelector(selectCart);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setPriceTotal(total);
  }, [items]);

  return (
    <div className="cart-page">
      <h1 className="title cart-page__title">Your Cart: {itemCount} Items</h1>
      <div className="cart-page__content">
        <div className="cart-list">
          {items.map(item => (
            <CartCard key={uuidv4()} item={item} />
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
          <Button className="cart-checkout__button">Check out</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
