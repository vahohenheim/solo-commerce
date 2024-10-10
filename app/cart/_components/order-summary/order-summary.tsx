'use client';
import { Button } from '@/app/_components/button/button';
import { CartProductsState } from '@/app/_store/features/cart/cart.model';
import { useAppSelector } from '@/app/_store/hooks';
import { useEffect, useState } from 'react';
import { FakeStoreProduct } from '@/app/_api/fake-store/fake-store.model';
import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';
import { NumberHelpers } from '@/app/_helpers/number';
import { ARBITRARY_SHIPPING, ARBITRARY_TAXES } from '@/app/cart/_components/order-summary/order-summary.constants';
import OrderSummarySkeletonComponent from '@/app/cart/_components/order-summary/order-summary.skeleton';
import Link from 'next/link';

const calculateTotal = (products: Array<FakeStoreProduct | null>, quantityProducts: CartProductsState) => {
    return products.reduce((acc, product) => {
        if (product?.id && quantityProducts[product?.id]) {
            return acc + (product?.price || 0) * quantityProducts[product?.id]?.quantity;
        }

        return acc;
    }, 0);
};

const OrderSummaryComponent = () => {
    const quantityProducts: CartProductsState = useAppSelector((state) => state.cart.products);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState<Array<FakeStoreProduct | null>>([]);
    const [total, setTotal] = useState<number | null>(null);

    const fetchProduct = async () => {
        const fetchedProducts = await Promise.all(Object.keys(quantityProducts).map((productId) => FakeStoreApi.fetchProduct(Number(productId))));
        setProducts(fetchedProducts.filter((product) => product !== null));
    };

    useEffect(() => {
        if (Object.keys(quantityProducts).length > 0) {
            setLoading(true);
            fetchProduct();
            setLoading(false);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (products && products.length > 0) {
            setTotal(calculateTotal(products, quantityProducts));
        }
    }, [quantityProducts, products]);

    if (Object.keys(quantityProducts).length === 0) {
        return <></>;
    }

    if (loading || !loaded) {
        return <OrderSummarySkeletonComponent />;
    }

    return (
        <div className="rounded bg-gray-100 px-4 py-6 sm:px-6">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">Order summary</h3>

            <div className="mt-2 flex flex-col divide-y divide-gray-200">
                <div className="flex items-center justify-between py-2">
                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                        {NumberHelpers.format(total || 0, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>
                </div>
                <div className="flex items-center justify-between py-2">
                    <p className="text-sm font-medium text-gray-900">Shipping estimate</p>
                    <p className="text-sm font-medium text-gray-900">
                        {NumberHelpers.format(ARBITRARY_SHIPPING, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>
                </div>
                <div className="flex items-center justify-between py-2">
                    <p className="text-sm font-medium text-gray-900">Tax estimate</p>
                    <p className="text-sm font-medium text-gray-900">
                        {NumberHelpers.format(ARBITRARY_TAXES, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>
                </div>
                <div className="flex items-center justify-between border-t py-2">
                    <p className="text-xl font-medium text-gray-900">Order total</p>
                    <p className="text-xl font-medium text-gray-900">
                        {NumberHelpers.format((total || 0) + ARBITRARY_SHIPPING + ARBITRARY_TAXES, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <Button className="w-full">Checkout</Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or
                    <Link href={'/'}>
                        <button type="button" className="ml-2 font-medium text-gray-900 hover:text-gray-600">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default OrderSummaryComponent;
