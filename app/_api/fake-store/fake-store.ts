import { FetchApi } from "@/app/_api/fetch/fetch";
import {FakeStoreProduct} from "@/app/_api/fake-store/fake-store.model";

export class FakeStoreApi {
    // TODO: use from .env
    static BASEPATH = "https://fakestoreapi.com/";

    static fetchProducts = async (): Promise<Array<FakeStoreProduct> | null>  => {
        const endpoint = "/products";

        // TODO: replace by right endpoint
        //const url = `${FakeStoreApi.BASEPATH}${endpoint}`;
        const url = 'http://localhost:3000/fake-store/products.json'

        const result = await FetchApi.get<Array<FakeStoreProduct>>(url);
        return result.data;
    }

    static fetchProduct = async (id: string): Promise<FakeStoreProduct | null> => {
        const endpoint = `/products/${id}`;

        // TODO: replace by right endpoint
        //const url = `${FakeStoreApi.BASEPATH}${endpoint}`;
        const url = 'http://localhost:3000/fake-store/1.json'

        const result = await FetchApi.get<FakeStoreProduct>(url)
        return result.data;
    }
}