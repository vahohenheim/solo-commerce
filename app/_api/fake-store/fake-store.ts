import { FetchApi } from '@/app/_api/fetch/fetch';
import { FakeStoreCategory, FakeStoreProduct } from '@/app/_api/fake-store/fake-store.model';

export class FakeStoreApi {
    // TODO: use from .env
    static BASEPATH = 'https://fakestoreapi.com/';

    static fetchProducts = async (category?: FakeStoreCategory, limit?: number): Promise<Array<FakeStoreProduct> | null> => {
        const endpoint = 'products';
        const url = `${FakeStoreApi.BASEPATH}${endpoint}`;

        const result = await FetchApi.get<Array<FakeStoreProduct>>(url);
        const products = result.data;

        // TODO: normaly manage it from API
        const hasProducts = products && products.length > 0;

        if (hasProducts && limit && category) {
            const filteredProducts = FakeStoreApi.filterByCategory(products, category);
            return FakeStoreApi.sliceProducts(filteredProducts, limit);
        }

        if (hasProducts && category) {
            return FakeStoreApi.filterByCategory(products, category);
        }

        if (hasProducts && limit) {
            return FakeStoreApi.sliceProducts(products, limit);
        }

        return products;
    };

    static fetchProduct = async (id: number): Promise<FakeStoreProduct | null> => {
        const endpoint = `products/${id}`;
        const url = `${FakeStoreApi.BASEPATH}${endpoint}`;

        const result = await FetchApi.get<FakeStoreProduct>(url);
        return result.data;
    };

    private static filterByCategory(products: Array<FakeStoreProduct>, category: FakeStoreCategory) {
        return products.filter((product) => product.category === category);
    }

    private static sliceProducts(products: Array<FakeStoreProduct>, limit: number) {
        return products.slice(0, limit);
    }
}
