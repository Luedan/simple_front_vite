import { configureStore } from "@reduxjs/toolkit";

/**
 * Reducers imports
 */

import { apiSlice } from "./slices/apiSlice";
import { REDUCERS } from "./reducers";

/**
 * Store configuration
 */
export const store = configureStore({
  reducer: {
    ...REDUCERS,
  },
  middleware: (getDefaultMiddleware) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middleware = [...getDefaultMiddleware(), apiSlice.middleware] as any;
    return middleware;
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
