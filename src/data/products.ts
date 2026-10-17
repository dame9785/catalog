export type Product = {
  id: number
  name: string
  description: string
  price: string
  color: string
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Svart plastkort',
    description: 'Ett stilrent plastkort för företag och medlemskap.',
    price: 'Exempelpris: 2,50 kr/st',
    color: 'bg-slate-900',
    category: 'Populär',
  },
  {
    id: 2,
    name: 'Vitt plastkort',
    description: 'Ett rent och minimalistiskt kort med många möjligheter.',
    price: 'Exempelpris: 2,00 kr/st',
    color: 'bg-white',
    category: 'Klassisk',
  },
  {
    id: 3,
    name: 'Blått plastkort',
    description: 'Ett färgstarkt kort för medlemskap och kundklubbar.',
    price: 'Exempelpris: 2,25 kr/st',
    color: 'bg-blue-700',
    category: 'Företag',
  },
]
