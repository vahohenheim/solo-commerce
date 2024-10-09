import { ProductCardComponentProps } from '@/app/_components/product-card/product-card.model';
import Image from 'next/image';
import Link from 'next/link';
import { NumberHelpers } from '@/app/_helpers/number';

const ProductCardComponent = ({ image, title, price, link }: ProductCardComponentProps) => {
    return (
        <Link href={link} className="rounded tracking-tight transition-opacity hover:opacity-70">
            <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg">
                <Image width={200} height={300} src={image} alt={title} className="h-[300px] w-full object-contain object-center group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{NumberHelpers.format(price, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}</p>
        </Link>
    );
};

export default ProductCardComponent;
