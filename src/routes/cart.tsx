import { createFileRoute, Link } from '@tanstack/react-router';
import { products } from '../data/products';
import { useCart } from '../components/CartProvider';

export const Route = createFileRoute('/cart')({
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Din varukorg</h1>

          <p className="mt-4 text-slate-600">Din varukorg är tom.</p>

          <Link to="/" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Utforska produkter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Din varukorg</h1>

        <p className="mt-2 text-slate-600">Du har {cart.length} konfigurationer i varukorgen.</p>

        <div className="mt-8 space-y-4">
          {cart.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            console.log('Cart item:', item);
            console.log('Found product:', product);
            if (!product) {
              return null;
            }

            return (
              <article key={item.id} className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold">{product.name}</h2>

                  <p className="mt-1 text-sm text-slate-600">Material: {item.material === 'standard' ? 'Standardplast' : 'Återvunnen plast'}</p>

                  <p className="mt-1 text-sm text-slate-600">Antal kort: {item.cardQuantity.toLocaleString('sv-SE')}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Ta bort
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Fortsätt handla
          </Link>

          <button type="button" onClick={clearCart} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-white">
            Töm varukorgen
          </button>
        </div>

        <p className="mt-6 text-sm text-slate-500">Detta är en övningsvarukorg. Inga riktiga priser eller beställningar hanteras ännu.</p>
      </div>
    </main>
  );
}
