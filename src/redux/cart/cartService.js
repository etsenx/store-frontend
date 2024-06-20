import axios from 'axios';
import { addItem, removeItem, updateQuantity, setCart } from './cartSlice';

import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_REACT_API_URL}/users/cart`;

export const getCart = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    const cartData = response.data;
    const items = cartData.items.map(item => ({
      _id: item._id,
      quantity: item.quantity,
      productId: item.productId
    }));

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const itemCount = items.length;

    dispatch(setCart({ items, cartCount, itemCount }));
  } catch (error) {
    console.error('Error fetching cart data', error);
  }
};

export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/add`, item, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    dispatch(addItem(response.data.product));
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
  }
};

export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    if (quantity < 1) {
      return await dispatch(removeFromCart(itemId));
    } else {
      const response = await axios.put(`${API_URL}/update`, { productId: itemId, quantity }, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      dispatch(updateQuantity({ id: itemId, quantity }));
      return response.data;
    }
  } catch (error) {
    console.error('Error updating cart item', error);
  }
};

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    const productId = itemId;
    const response = await axios.delete(`${API_URL}/remove/${productId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    dispatch(removeItem({ productId: itemId }));
    return response.data;
  } catch (error) {
    console.error('Error removing from cart', error);
  }
};
