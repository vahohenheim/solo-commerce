import ProductCardComponent from '@/app/_components/product-card/product-card';
import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';
import { ProductListComponentProps } from '@/app/_components/product-list/product-list.model';

const ErrorProductListComponent = () => {
    return <div>Oops, something went wrong! We&apos;re sorry, but there seems to be a problem on our end. Please try again later.</div>;
};

const EmptyProductListComponent = () => {
    return <div>Any product</div>;
};

const ProductListComponent = async ({ category, limit }: ProductListComponentProps) => {
    const products = await FakeStoreApi.fetchProducts(category, limit);
    const hasError = !products || !Array.isArray(products);
    const isEmpty = products?.length === 0;

    if (hasError) {
        return <ErrorProductListComponent />;
    }

    if (isEmpty) {
        return <EmptyProductListComponent />;
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <ProductCardComponent key={product.id} image={product.image} title={product.title} price={product.price} link={`/product/${product.id}`} />
            ))}
        </div>
    );
};

export default ProductListComponent;
