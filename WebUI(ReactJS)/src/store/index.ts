import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import deviceSlice from './slices/deviceSlice';
import yangModelSlice from './slices/yangModelSlice';
import apiSchemaSlice from './slices/apiSchemaSlice';
import mappingSlice from './slices/mappingSlice';
import templateSlice from './slices/templateSlice';
import serviceSlice from './slices/serviceSlice';
import notificationSlice from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    devices: deviceSlice,
    yangModels: yangModelSlice,
    apiSchemas: apiSchemaSlice,
    mappings: mappingSlice,
    templates: templateSlice,
    services: serviceSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
