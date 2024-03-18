import Button from "../../components/Button/Button";
import CartCard from "../../components/CartCard/CartCard";
import "./Cart.css";

function Cart() {
  return (
    <div className="cart-page">
      <h1 className="title cart-page__title">Your Cart: 2 Items</h1>
      <div className="cart-page__content">
        <div className="cart-list">
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div className="cart-checkout">
          <h2 className="cart-checkout__title">Order Summary</h2>
          <hr />
          <div className="cart-checkout__details">
            <div className="cart-checkout__detail">
              <span>Units:</span>
              <span>4 (Units)</span>
            </div>
            <div className="cart-checkout__detail">
              <span>Est. total:</span>
              <span>$942.89</span>
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
