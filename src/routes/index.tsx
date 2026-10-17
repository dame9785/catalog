import { createFileRoute, Link } from '@tanstack/react-router'
import { products } from '#/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Plastkort<span className="text-blue-600">.</span>
          </a>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#products" className="hover:text-blue-600">
              Produkter
            </a>
            <a href="#about" className="hover:text-blue-600">
              Om oss
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Plastkort för företag
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Hitta rätt plastkort för ditt företag.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Upptäck plastkort för medlemskap, kundklubbar och andra
            företagsbehov. Välj en produkt och utforska alternativen.
          </p>

          <a
            href="#products"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Utforska produkter
          </a>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Vårt sortiment
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Våra plastkort
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Här visar vi exempelprodukter. Senare hämtar vi riktiga
            produktuppgifter från Plastkorts backend.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-slate-100 p-8">
                <div
                  className={`mx-auto flex aspect-[1.6/1] max-w-xs items-center justify-center rounded-xl shadow-lg ${product.color}`}
                >
                  <span
                    className={`text-xl font-bold tracking-widest ${
                      product.id === 2 ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    PLASTKORT
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {product.category}
                </span>

                <h3 className="mt-4 text-xl font-bold">{product.name}</h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <p className="mt-4 font-semibold text-slate-900">
                  {product.price}
                </p>

                <Link
                  to="/products/$productId"
                  params={{ productId: String(product.id) }}
                  className="mt-5 block w-full rounded-lg bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
                >
                  Visa produkt
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-xl font-bold">Plastkort för företag</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Detta är vår första övningsversion. Vi kommer stegvis att utveckla
            produktvisning, konfiguration, varukorg och API-anrop.
          </p>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Plastkort Store – Övningsprojekt
      </footer>
    </main>
  )
}
