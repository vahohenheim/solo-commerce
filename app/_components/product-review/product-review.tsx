import { ProductReviewComponentProps } from '@/app/_components/product-review/product-review.model';
import { cn } from '@/app/_utils/classnames';

const ProductReviewComponent = ({ rate, count }: ProductReviewComponentProps) => {
    const totalReview = Array.from(Array(5).keys());
    return (
        <div className="mt-6">
            <div className="flex items-center">
                <div className="flex items-center">
                    {totalReview.map((note) => (
                        <svg
                            key={note}
                            className={cn('size-5 shrink-0', note >= rate ? 'text-gray-200' : 'text-gray-900')}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    ))}
                </div>
                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {count} reviews
                </a>
            </div>
        </div>
    );
};

export default ProductReviewComponent;
