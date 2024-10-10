'use client';

import { ProductActionComponentProps } from '@/app/product/[id]/_components/product-action/product-action.model';
import { Button } from '@/app/_components/button/button';
import { useAppDispatch } from '@/app/_store/hooks';
import { addProduct } from '@/app/_store/features/cart/cart.slice';
import { useToast } from '@/app/_hooks/use-toast';

const ProductActionComponent = ({ productId }: ProductActionComponentProps) => {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const addProductHandler = () => {
        dispatch(addProduct(productId));
        toast({
            title: 'Product added to cart',
            duration: 1500
        });
    };

    return (
        <div className="mt-10">
            <Button className="w-full" onClick={() => addProductHandler()}>
                Add to bag
            </Button>
        </div>
    );
};

export default ProductActionComponent;
