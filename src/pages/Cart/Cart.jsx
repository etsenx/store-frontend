import CartCard from '../../components/CartCard/CartCard';
import './Cart.css';

function Cart() {
  return (
    <div className="cart-page">
      <h1 className="title">Your Cart: 2 Items</h1>
      <div className='cart-list'>
        <CartCard />
      </div>
    </div>
  )
}

export default Cart;