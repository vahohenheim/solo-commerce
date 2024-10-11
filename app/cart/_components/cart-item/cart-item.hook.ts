import { useEffect, useState } from 'react';
import { FakeStoreProduct } from '@/app/_api/fake-store/fake-store.model';
import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';

export const useCartItemData = (productId: number): [FakeStoreProduct | null, boolean, boolean] => {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [product, setProduct] = useState<FakeStoreProduct | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await FakeStoreApi.fetchProduct(productId);
            setProduct(product);
        };

        setLoading(true);
        fetchProduct();
        setLoading(false);
        setLoaded(true);
    }, [productId]);

    return [product, loading, loaded];
};
