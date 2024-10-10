import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CartProductsState, CartState } from '@/app/_store/features/cart/cart.model';

const initialState: CartState = {
    products: {}
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<number>) => {
            // TODO: manage if product doesn't exist in the api
            const productId = action.payload;

            // Case manage for product already added
            if (productId in state.products) {
                const updatedProduct: CartProductsState = { [productId]: { quantity: state.products[productId].quantity + 1 } };
                state.products = { ...state.products, ...updatedProduct };
            } else {
                const newProduct: CartProductsState = { [productId]: { quantity: 1 } };
                state.products = { ...state.products, ...newProduct };
            }
        },
        updateQuantityProduct: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const productId = action.payload.id;

            if (productId in state.products) {
                state.products[productId].quantity = action.payload.quantity;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const products = state.products;
            const productId = action.payload;
            delete products[productId];
            state.products = { ...state.products };
        }
    }
});

export const { addProduct, updateQuantityProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
