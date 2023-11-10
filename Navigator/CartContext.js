import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pokemon) => {
    const existingProductIndex = cart.findIndex((item) => item.id === pokemon.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...pokemon, quantity: 1 }]);
    }
  };

  const removeFromCart = (pokemon) => {
    const updatedCart = cart.filter((item) => item.id !== pokemon.id);
    setCart(updatedCart);
  };

  const increaseQuantity = (pokemon) => {
    const existingProductIndex = cart.findIndex((item) => item.id === pokemon.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const decreaseQuantity = (pokemon) => {
    const existingProductIndex = cart.findIndex((item) => item.id === pokemon.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity -= 1;

      if (updatedCart[existingProductIndex].quantity === 0) {
        updatedCart.splice(existingProductIndex, 1); 
      }

      setCart(updatedCart);
    }
  };

  const clearCart = () => {
    setCart([]); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart');
  }
  return context;
};
