import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types/cart';
import { getCart, saveCart } from '../lib/cart-storage';

type AddCartItem = Omit<CartItem, 'id' | 'addedAt'>;

type CartContextValue = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: AddCartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCart(cart);
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((item: AddCartItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.material === item.material && cartItem.cardQuantity === item.cardQuantity,
      );

      if (existingItem) {
        return currentCart.map((cartItem) => (cartItem.id === existingItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
      }

      return [
        ...currentCart,
        {
          ...item,
          id: crypto.randomUUID(),
          quantity: 1,
          addedAt: Date.now(),
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cart, cartCount, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart måste användas inuti CartProvider');
  }

  return context;
}
