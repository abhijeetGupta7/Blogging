import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "../redux/user/userSlice"; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { createFilter } from 'redux-persist-transform-filter';

const saveUserOnly = createFilter('user', ['currentUser']);  // only persist this

const rootReducer=combineReducers({
  user:userReducer
})

const persistConfig={
  key:'root',
  storage,
  version:1,
  transforms: [saveUserOnly]
}

const persistedReducer=persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
