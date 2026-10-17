import type { CartItem } from '../types/cart'

const CART_KEY = 'plastkort-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedCart = localStorage.getItem(CART_KEY)

    if (!storedCart) {
      return []
    }

    const parsed: unknown = JSON.parse(storedCart)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed as CartItem[]
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}
