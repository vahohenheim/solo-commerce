import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, initialState } from '@/app/_store/features/cart/cart.slice';
import { listenerMiddleware } from '@/app/_store/middleware';
import { LOCAL_STORAGE_ID } from '@/app/_store/store.constants';
import { CartState } from '@/app/_store/features/cart/cart.model';

const getStoragedState = <T>(id: string) => {
    // Manage server side
    if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem(id) || 'null') as T;
    }
    return null;
};

export const cartStore = () => {
    const storagedCart = getStoragedState<CartState>(LOCAL_STORAGE_ID);
    return configureStore({
        preloadedState: {
            cart: storagedCart === null ? initialState : storagedCart
        },
        reducer: {
            cart: cartSlice.reducer
            // TODO: Improve this by adding product persistence
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware),
        devTools: process.env.NODE_ENV !== 'production'
    });
};

export type AppStore = ReturnType<typeof cartStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
