import { FetchApi } from '@/app/_api/fetch/fetch';
import { FakeStoreCategory, FakeStoreProduct } from '@/app/_api/fake-store/fake-store.model';

export class FakeStoreApi {
    static fetchProducts = async (category?: FakeStoreCategory, removedProducts?: Array<number>, limit?: number): Promise<Array<FakeStoreProduct> | null> => {
        const basepath = process.env.NEXT_PUBLIC_FAKE_STORE_API_BASEPATH;
        const endpoint = '/products';
        const url = `${basepath}${endpoint}`;

        const result = await FetchApi.get<Array<FakeStoreProduct>>(url);
        const products = result.data;

        const hasProducts = products && products.length > 0;

        if (hasProducts && (limit || category || removedProducts)) {
            // TODO: normaly manage it from API
            return FakeStoreApi.filterProducts(products, category, removedProducts, limit);
        }

        return products;
    };

    static fetchProduct = async (id: number): Promise<FakeStoreProduct | null> => {
        const basepath = process.env.NEXT_PUBLIC_FAKE_STORE_API_BASEPATH;
        const endpoint = `/products/${id}`;
        const url = `${basepath}${endpoint}`;

        const result = await FetchApi.get<FakeStoreProduct>(url);
        return result.data;
    };

    private static filterProducts(
        products: Array<FakeStoreProduct>,
        category?: FakeStoreCategory,
        removedProducts?: Array<number>,
        limit?: number
    ): Array<FakeStoreProduct> {
        // it's not the sexiest way to filter this product list, prefer "transducers"
        const filterRemovedProducts = FakeStoreApi.filterRemovedProducts(products, removedProducts);
        const filtedProductsByCategory = FakeStoreApi.filterByCategory(filterRemovedProducts, category);
        return FakeStoreApi.sliceProducts(filtedProductsByCategory, limit);
    }

    private static filterRemovedProducts(products: Array<FakeStoreProduct>, removedProducts?: Array<number>) {
        return products.filter((product) => (removedProducts ? !removedProducts.includes(product.id) : true));
    }

    private static filterByCategory(products: Array<FakeStoreProduct>, category?: FakeStoreCategory) {
        return products.filter((product) => (category ? product.category === category : true));
    }

    private static sliceProducts(products: Array<FakeStoreProduct>, limit?: number) {
        return limit ? products.slice(0, limit) : products;
    }
}
