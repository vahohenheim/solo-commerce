import ProductListComponent from '@/app/_components/product-list/product-list';

const HomePage = () => {
    return (
        <main className="mx-auto max-w-2xl px-2 py-6 sm:p-6 md:max-w-4xl lg:max-w-5xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
            <ProductListComponent />
        </main>
    );
};

export default HomePage;
