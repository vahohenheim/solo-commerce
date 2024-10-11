'use client';

import CartItemComponent from '@/app/cart/_components/cart-item/cart-item';
import { CartProductsState } from '@/app/_store/features/cart/cart.model';
import { useAppSelector } from '@/app/_store/hooks';

const EmptyCartListComponent = () => {
    return (
        <div className="mt-8">
            <p>Your cart is empty</p>
        </div>
    );
};

const CartListComponent = () => {
    const products: CartProductsState = useAppSelector((state) => state.cart.products);

    if (Object.keys(products).length === 0) {
        return <EmptyCartListComponent />;
    }

    return (
        <ul role="list" className="my-6 divide-y divide-gray-200">
            {Object.keys(products).map((productId: string) => (
                <li key={productId} className="flex py-6">
                    <CartItemComponent productId={Number(productId)} quantity={products[Number(productId)].quantity} />
                </li>
            ))}
        </ul>
    );
};

export default CartListComponent;
