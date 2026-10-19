import { useState } from 'react';
import { useCart } from './CartProvider';

type Props = {
  productId: number;
  productName: string;
};

type Material = 'standard' | 'recycled';
type Quantity = '100' | '500' | '1000';

export default function ProductConfiguration({ productName, productId }: Props) {
  const [material, setMaterial] = useState<Material>('standard');
  const [quantity, setQuantity] = useState<Quantity>('100');

  const { addToCart } = useCart();

  return (
    <section className="mt-8 space-y-6">
      <h2 className="text-xl font-bold">Anpassa {productName}</h2>

      <div>
        <label htmlFor="material" className="mb-2 block font-semibold">
          Välj material
        </label>

        <select
          id="material"
          value={material}
          onChange={(event) => setMaterial(event.target.value as Material)}
          className="w-full rounded-lg border border-slate-300 bg-white p-3"
        >
          <option value="standard">Standardplast</option>
          <option value="recycled">Återvunnen plast</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="mb-2 block font-semibold">
          Välj antal
        </label>

        <select
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value as Quantity)}
          className="w-full rounded-lg border border-slate-300 bg-white p-3"
        >
          <option value="100">100 kort</option>
          <option value="500">500 kort</option>
          <option value="1000">1 000 kort</option>
        </select>
      </div>

      <div className="rounded-xl bg-slate-100 p-5">
        <p className="text-sm text-slate-500">Din konfiguration</p>

        <p className="mt-2 font-semibold">Material: {material === 'standard' ? 'Standardplast' : 'Återvunnen plast'}</p>

        <p className="mt-1 font-semibold">Antal: {Number(quantity).toLocaleString('sv-SE')} kort</p>

        <p className="mt-3 text-sm text-slate-500">Exempelkonfiguration – inget riktigt pris har beräknats.</p>
      </div>
      <button
        type="button"
        onClick={() => {
          addToCart({
            productId,
            material,
            cardQuantity: Number(quantity) as 100 | 500 | 1000,
          });
        }}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Lägg i varukorg
      </button>
    </section>
  );
}
