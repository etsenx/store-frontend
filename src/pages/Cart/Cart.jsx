import CartCard from '../../components/CartCard/CartCard';
import './Cart.css';

function Cart() {
  return (
    <div className="cart-page">
      <h1 className="title cart-page__title">Your Cart: 2 Items</h1>
      <div className='cart-list'>
        <CartCard />
        <CartCard />
        <CartCard />
      </div>
    </div>
  )
}

export default Cart;