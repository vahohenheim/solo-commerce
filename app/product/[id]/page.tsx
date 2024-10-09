import ProductDetailComponent from '@/app/_components/product-detail/product-detail';

const ProductPage = ({ params }: { params: { id: string } }) => {
    return (
        <main className="mx-auto max-w-2xl px-4 py-6 sm:p-6 md:max-w-4xl lg:max-w-5xl lg:px-8">
            <ProductDetailComponent id={params.id} />
        </main>
    );
};

export default ProductPage;
