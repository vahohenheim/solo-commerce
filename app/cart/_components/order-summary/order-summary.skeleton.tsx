import { Button } from '@/app/_components/button/button';
import { Skeleton } from '@/app/_components/skeleton/skeleton';

const OrderSummarySkeletonComponent = () => {
    return (
        <div className="rounded bg-gray-50 px-4 py-6 sm:px-6">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">Order summary</h3>

            <div className="mt-2 flex flex-col divide-y divide-gray-200">
                <div className="flex items-center justify-between py-2">
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                </div>
                <div className="flex items-center justify-between py-2">
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                </div>
                <div className="flex items-center justify-between py-2">
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                </div>
                <div className="flex items-center justify-between border-t py-2">
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                    <Skeleton className="h-4 w-[80px] rounded-md" />
                </div>
            </div>

            <div className="mt-6">
                <Button className="w-full">Checkout</Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or
                    <button type="button" className="ml-2 font-medium text-gray-900 hover:text-gray-600">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </button>
                </p>
            </div>
        </div>
    );
};

export default OrderSummarySkeletonComponent;
