import CartListComponent from '@/app/cart/_components/cart-list/cart-list';
import OrderSummary from '@/app/cart/_components/order-summary/order-summary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cart | solo commerce',
    description: 'shopping cart'
};

const CartPage = () => {
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shopping cart</h2>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                    <CartListComponent />
                </div>
                <div className="col-span-2">
                    <OrderSummary />
                </div>
            </div>
        </>
    );
};

export default CartPage;
