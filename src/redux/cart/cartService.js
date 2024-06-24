import axios from 'axios';
import { addItem, removeItem, updateQuantity } from '../slices/cartSlice';

const API_URL = `${import.meta.env.VITE_REACT_API_URL}/users/cart`;

export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/add`, item, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(addItem(item));
    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
  }
};

export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/update`, { itemId, quantity }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    dispatch(updateQuantity({ id: itemId, quantity }));
    return response.data;
  } catch (error) {
    console.error('Error updating cart item', error);
  }
};

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/remove`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      data: { itemId },
    });
    dispatch(removeItem({ id: itemId, quantity: 1 }));
    return response.data;
  } catch (error) {
    console.error('Error removing from cart', error);
  }
};
