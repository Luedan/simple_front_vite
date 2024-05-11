import { apiSlice } from "./slices/apiSlice";
import todoReducer from "./slices/todo/todoSlice";

export const REDUCERS = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    todo: todoReducer
}