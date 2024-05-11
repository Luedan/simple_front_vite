import { Todo } from "../../../domain/todo";
import { apiSlice } from "../apiSlice";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], string>({
      query: () => "/api/todos",
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/api/todos/${id}`,
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "/api/todos",
        method: "POST",
        body,
      }),
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: `/api/todos/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTodo: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCreateTodoMutation,
} = todoApi;
