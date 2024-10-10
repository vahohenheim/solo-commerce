import { Skeleton } from '@/app/_components/skeleton/skeleton';

const CartItemSkeletonComponent = () => {
    return (
        <div className="flex">
            <Skeleton className="size-[200px] rounded-xl" />

            <div className="ml-4 flex grow flex-col">
                <div className="flex grow flex-col">
                    <h3 className="text-base font-medium text-gray-900 transition-all hover:text-gray-600">
                        <Skeleton className="h-4 w-[200px] rounded-md" />
                    </h3>
                    <Skeleton className="h-4 w-[200px] rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default CartItemSkeletonComponent;
