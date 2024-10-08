import ProductCardComponent from "@/app/_components/product-card/product-card";
import {FakeStoreApi} from "@/app/_api/fake-store/fake-store";

const ErrorProductListComponent = () => {
    return <div>
        Oops, something went wrong! We&apos;re sorry, but there seems to be a problem on our end. Please try again later.
    </div>
}

const EmptyProductListComponent = () => {
    return <div>
        Any product
    </div>
}

const ProductListComponent = async () => {
    const products = await FakeStoreApi.fetchProducts();

    if (!products || !Array.isArray(products)) {
        return <ErrorProductListComponent />
    }

    if(products.length === 0) {
        return <EmptyProductListComponent />
    }

    return <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
            <ProductCardComponent key={product.id} image={product.image} title={product.title} price={product.price} link={`product/${product.id}`}/>
        ))}
    </div>
}

export default ProductListComponent;