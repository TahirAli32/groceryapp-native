import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer)
const authPersistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    cart: cartPersistedReducer,
    auth: authPersistedReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)