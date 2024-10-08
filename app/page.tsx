import ProductListComponent from "@/app/_components/product-list/product-list";

const HomePage = () => {
  return (
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <ProductListComponent/>
      </main>
  )
}

export default HomePage;