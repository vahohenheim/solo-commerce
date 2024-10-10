import ProductDetailComponent from '@/app/product/[id]/_components/product-detail/product-detail';
import type { Metadata } from 'next';
import { FakeStoreApi } from '@/app/_api/fake-store/fake-store';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const product = await FakeStoreApi.fetchProduct(Number(params.id));

    return {
        title: product?.title,
        description: product?.description
    };
}

const ProductPage = ({ params }: { params: { id: string } }) => {
    return <ProductDetailComponent id={Number(params.id)} />;
};

export default ProductPage;
