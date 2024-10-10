'use client';
import NumberInput from '@/app/_components/input-number/input-number';
import { deleteProduct, updateQuantityProduct } from '@/app/_store/features/cart/cart.slice';
import { Button } from '@/app/_components/button/button';
import { Trash } from 'lucide-react';
import { useAppDispatch } from '@/app/_store/hooks';
import { CartItemActionsComponentProps } from '@/app/cart/_components/cart-item/_components/cart-item-actions/cart-item-actions.model';
import { useToast } from '@/app/_hooks/use-toast';

const CartItemActionsComponent = ({ productId, quantity }: CartItemActionsComponentProps) => {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const deleteProductHandler = () => {
        dispatch(deleteProduct(productId));
        toast({
            title: 'Product deleted',
            duration: 1500
        });
    };

    return (
        <div className="flex justify-between">
            <NumberInput
                min={1}
                max={10}
                step={1}
                defaultValue={quantity}
                onChange={(value) => dispatch(updateQuantityProduct({ id: productId, quantity: value }))}
            />
            <div className="flex">
                <Button variant="outline" onClick={() => deleteProductHandler()}>
                    <Trash size={20} />
                </Button>
            </div>
        </div>
    );
};

export default CartItemActionsComponent;
