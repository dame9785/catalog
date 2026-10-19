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
    console.log('Item received by addToCart:', item);

    setCart((currentCart) => [
      ...currentCart,
      {
        ...item,
        id: crypto.randomUUID(),
        addedAt: Date.now(),
      },
    ]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.length;

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
