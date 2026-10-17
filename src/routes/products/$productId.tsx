import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/data/products.ts'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = Route.useParams()

  const product = products.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="text-2xl font-bold">Produkten hittades inte</h1>
        <Link to="/" className="mt-4 inline-block text-blue-600">
          Tillbaka till produkterna
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Tillbaka till produkterna
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div
            className={`flex aspect-[1.6/1] max-w-md items-center justify-center rounded-xl ${product.color}`}
          >
            <span
              className={`text-xl font-bold tracking-widest ${product.id === 2 ? 'text-slate-900' : 'text-white'}`}
            >
              PLASTKORT
            </span>
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-slate-600">{product.description}</p>

          <p className="mt-6 text-lg font-semibold">{product.price}</p>
        </section>
      </div>
    </main>
  )
}
