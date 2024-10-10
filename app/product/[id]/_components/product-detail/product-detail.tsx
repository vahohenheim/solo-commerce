import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';
import { ProductDetailComponentProps } from '@/app/product/[id]/_components/product-detail/product-detail.model';
import { notFound } from 'next/navigation';
import { CATEGORY_LABELS } from '@/app/_constants/categories';
import ProductReviewComponent from '@/app/product/[id]/_components/product-review/product-review';
import { NumberHelpers } from '@/app/_helpers/number';
import Image from 'next/image';
import ProductListComponent from '@/app/_components/product-list/product-list';
import ProductActionComponent from '@/app/product/[id]/_components/product-action/product-action';

const ProductDetailComponent = async ({ id }: ProductDetailComponentProps) => {
    // Any cache invalidation is defined here. It's going to be a problem when the product data changed.
    // We can make a cache revalidation with a webhook from the api and an endpoint in this Next.js project.
    const product = await FakeStoreApi.fetchProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <nav aria-label="Breadcrumb">
                <ol role="list" className="max-w-2xl items-center md:flex md:space-x-2 lg:max-w-7xl">
                    <li>
                        <div className="flex items-center">
                            <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                                {CATEGORY_LABELS[product.category]}
                            </a>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>

                    <li className="text-sm">
                        <p className="font-medium text-gray-500">{product.title}</p>
                    </li>
                </ol>
            </nav>
            <div className="mx-auto grid grid-cols-1 pb-16 pt-10 md:grid-cols-5 lg:gap-x-8 lg:pb-24 lg:pt-16">
                <Image
                    width={800}
                    height={800}
                    src={product.image}
                    alt={product.title}
                    className="col-span-3 h-[300px] w-full object-contain object-center p-4 sm:h-[400px] md:h-[600px]"
                />
                <div className="col-span-2 mt-4 lg:mt-0">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>

                    <p className="mt-2 text-3xl tracking-tight text-gray-900">
                        {NumberHelpers.format(product.price, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}
                    </p>

                    <p className="mt-2 text-base text-gray-900">{product.description}</p>

                    <div>
                        <ProductReviewComponent rate={product.rating.rate} count={product.rating.count} />
                    </div>

                    <ProductActionComponent productId={product.id} />
                </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">Related Products</h2>
            <ProductListComponent category={product.category} limit={4} />
        </div>
    );
};

export default ProductDetailComponent;
