import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from '@/app/_store/features/cart/cart.slice';

export const cartStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice.reducer
            // TODO: Improve this by adding product persistence
        },
        devTools: process.env.NODE_ENV !== 'production'
    });
};

export type AppStore = ReturnType<typeof cartStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
