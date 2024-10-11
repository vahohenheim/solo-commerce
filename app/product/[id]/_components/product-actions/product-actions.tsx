'use client';

import { ProductActionsComponentProps } from '@/app/product/[id]/_components/product-actions/product-actions.model';
import { Button } from '@/app/_components/button/button';
import { useProductActions } from '@/app/product/[id]/_components/product-actions/product-actions.hook';

const ProductActionsComponent = ({ productId, productName }: ProductActionsComponentProps) => {
    const [addProductHandler] = useProductActions(productId, productName);

    return (
        <div className="mt-10">
            <Button className="w-full" onClick={() => addProductHandler()}>
                Add to bag
            </Button>
        </div>
    );
};

export default ProductActionsComponent;
