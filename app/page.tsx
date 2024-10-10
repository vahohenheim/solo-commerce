import ProductListComponent from '@/app/_components/product-list/product-list';

const HomePage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
            <ProductListComponent />
        </>
    );
};

export default HomePage;
