import { createFileRoute, Link } from '@tanstack/react-router';
import { products } from '../../data/products';
import ProductConfiguration from '#/components/ProductConfiguration';

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="text-2xl font-bold">Produkten hittades inte</h1>

        <Link to="/" className="mt-4 inline-block text-blue-600">
          Tillbaka till produkterna
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Tillbaka till produkterna
        </Link>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Produktkort */}
          <div className="bg-slate-100 p-8 sm:p-12">
            <div className={`mx-auto flex aspect-[1.6/1] max-w-md items-center justify-center rounded-xl shadow-lg ${product.color}`}>
              <span className={`text-xl font-bold tracking-widest ${product.id === 2 ? 'text-slate-900' : 'text-white'}`}>PLASTKORT</span>
            </div>
          </div>

          {/* Produktinformation */}
          <div className="p-6 sm:p-10">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{product.category}</span>

            <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>

            <p className="mt-3 leading-7 text-slate-600">{product.description}</p>

            <p className="mt-4 font-semibold">{product.price}</p>

            {/* Produktkonfiguration */}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <ProductConfiguration productName={product.name} productId={product.id} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
