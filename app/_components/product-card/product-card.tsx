import {ProductCardComponentProps} from "@/app/_components/product-card/product-card.model";
import Image from "next/image";
import Link from "next/link";
import {NumberHelpers} from "@/app/_helpers/number";

const ProductCardComponent = ({ image, title, price, link }: ProductCardComponentProps) => {
    return <Link href={link}>
        <div
            className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
            <Image width={200} height={200}
                   src={image}
                   alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                   className="size-full object-cover object-center group-hover:opacity-75"/>
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${NumberHelpers.format(price, NumberHelpers.FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT)}</p>
    </Link>
}

export default ProductCardComponent;