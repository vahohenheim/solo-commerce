import { CartItemComponentProps } from '@/app/cart/_components/cart-item/cart-item.model';
import Image from 'next/image';
import { NumberHelpers } from '@/app/_helpers/number';
import Link from 'next/link';
import CartItemActionsComponent from '@/app/cart/_components/cart-item/_components/cart-item-actions/cart-item-actions';
import CartItemSkeletonComponent from '@/app/cart/_components/cart-item/cart-item.skeleton';
import { useCartItemData } from '@/app/cart/_components/cart-item/cart-item.hook';

const ErrorCartItemComponent = () => {
    return <div>Something went wrong, this product doesn&#39;t exist.</div>;
};

const CartItemComponent = ({ productId, quantity }: CartItemComponentProps) => {
    const [product, loading, loaded] = useCartItemData(productId);

    if (loading || !loaded) {
        return <CartItemSkeletonComponent />;
    }

    if (!product) {
        return <ErrorCartItemComponent />;
    }

    return (
        <div className="flex grow">
            <Link href={`/product/${product.id}`}>
                <Image
                    width={200}
                    height={200}
                    src={product.image}
                    alt={product.title}
                    className="size-[200px] min-w-[200px] shrink-0 grow overflow-hidden rounded-md border border-gray-200 object-contain object-center p-4 transition-opacity hover:opacity-80"
                />
            </Link>

            <div className="ml-4 flex grow flex-col">
                <div className="flex grow flex-col">
                    <h3 className="text-base font-medium text-gray-900 transition-all hover:text-gray-600">
                        <Link href={`/product/${product.id}`}>{product.title}</Link>
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                        {NumberHelpers.format(product.price, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>
                </div>
                <CartItemActionsComponent productId={productId} quantity={quantity} />
            </div>
        </div>
    );
};

export default CartItemComponent;
