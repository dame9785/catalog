export type CartItem = {
  id: string
  productId: number
  material: 'standard' | 'recycled'
  cardQuantity: 100 | 500 | 1000
  addedAt: number
}
