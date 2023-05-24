import { configureStore } from '@reduxjs/toolkit';

import { isSSR } from '@/shared/utils';

import authReducer from './authorization/slice';

import type { EnhancedStore } from '@reduxjs/toolkit';

let store: EnhancedStore;

const createStore = <T>(preloadedState?: T) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

export const initializeStore = (preloadedState?: RootState): Store => {
  // Create new store if there is no existing one
  let newStore = store ?? createStore(preloadedState);

  // If we have both store and preloaded state, merge them
  if (preloadedState && store) {
    newStore = createStore({ ...store.getState(), ...preloadedState });

    // Assign store only on client
    // keep it undefined on backend
    if (!isSSR()) {
      store = newStore;
    }
  }

  // For SSG and SSR always create a new store
  // without setting it to the `store` object to avoid memory leaks
  if (isSSR()) {
    return newStore;
  }

  // If we are on client and store is not created
  if (!store) {
    store = newStore;
  }

  return newStore;
};

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
