import CartListComponent from '@/app/cart/_components/cart-list/cart-list';
import OrderSummary from '@/app/cart/_components/order-summary/order-summary';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderSummarySkeletonComponent from '@/app/cart/_components/order-summary/order-summary.skeleton';
import CartListSkeletonComponent from '@/app/cart/_components/cart-list/cart-list.skeleton';

export const metadata: Metadata = {
    title: 'Cart | solo commerce',
    description: 'shopping cart'
};

const CartPage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shopping cart</h2>
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-3">
                    <Suspense fallback={<CartListSkeletonComponent />}>
                        <CartListComponent />
                    </Suspense>
                </div>
                <div className="col-span-2">
                    <Suspense fallback={<OrderSummarySkeletonComponent />}>
                        <OrderSummary />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default CartPage;
