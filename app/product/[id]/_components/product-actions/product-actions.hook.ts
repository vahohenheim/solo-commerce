import { useAppDispatch } from '@/app/_store/hooks';
import { useToast } from '@/app/_hooks/use-toast';
import { addProduct } from '@/app/_store/features/cart/cart.slice';

export const useProductActions = (productId: number, productName: string): [() => void] => {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const addProductHandler = () => {
        dispatch(addProduct(productId));
        toast({
            title: `"${productName}" added to cart`,
            duration: 1500
        });
    };

    return [addProductHandler];
};
