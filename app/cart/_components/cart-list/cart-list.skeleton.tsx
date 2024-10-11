import CartItemSkeletonComponent from '@/app/cart/_components/cart-item/cart-item.skeleton';

const CartListSkeletonComponent = () => {
    return (
        <ul role="list" className="my-6 divide-y divide-gray-200">
            <CartItemSkeletonComponent />
            <CartItemSkeletonComponent />
            <CartItemSkeletonComponent />
        </ul>
    );
};

export default CartListSkeletonComponent;
