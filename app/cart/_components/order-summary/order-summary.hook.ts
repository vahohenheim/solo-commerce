import { CartProductsState } from '@/app/_store/features/cart/cart.model';
import { useAppSelector } from '@/app/_store/hooks';
import { useEffect, useState } from 'react';
import { FakeStoreProduct } from '@/app/_api/fake-store/fake-store.model';
import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';

const calculateTotal = (products: Array<FakeStoreProduct | null>, quantityProducts: CartProductsState): number => {
    return products.reduce((acc, product) => {
        if (product?.id && quantityProducts[product?.id]) {
            return acc + (product?.price || 0) * quantityProducts[product?.id]?.quantity;
        }

        return acc;
    }, 0);
};

export const useOrderSummaryData = (): [CartProductsState, number | null, boolean, boolean] => {
    const quantityProducts: CartProductsState = useAppSelector((state) => state.cart.products);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState<Array<FakeStoreProduct | null>>([]);
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProducts = await Promise.all(Object.keys(quantityProducts).map((productId) => FakeStoreApi.fetchProduct(Number(productId))));
            setProducts(fetchedProducts.filter((product) => product !== null));
        };

        if (Object.keys(quantityProducts).length > 0) {
            setLoading(true);
            fetchProduct();
            setLoading(false);
            setLoaded(true);
        }
    }, [quantityProducts]);

    useEffect(() => {
        if (products && products.length > 0) {
            setTotal(calculateTotal(products, quantityProducts));
        }
    }, [quantityProducts, products]);

    return [quantityProducts, total, loading, loaded];
};
