import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, updateQuantityProduct } from '@/app/_store/features/cart/cart.slice';
import { RootState } from '@/app/_store/store';
import { LOCAL_STORAGE_ID } from '@/app/_store/store.constants';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    matcher: isAnyOf(addProduct, updateQuantityProduct, deleteProduct),
    effect: (action, listenerApi) => localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify((listenerApi.getState() as RootState).cart))
});
