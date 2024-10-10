export type CartProductsState = Record<number, { quantity: number }>;

export type CartState = {
    products: CartProductsState;
};
