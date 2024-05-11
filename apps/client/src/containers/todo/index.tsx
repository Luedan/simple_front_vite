import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useCreateTodoMutation, useDeleteTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation } from "../../store/slices/todo/todoApiSlice";
import { Controller, useForm } from "react-hook-form";
import { Todo } from "../../domain/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodos, isUpdateActive } from "../../store/slices/todo/todoSlice";
import { Badge, Button, Input, List, Modal } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { z } from "zod";

const schema = z.object({
    task: z.string({ message: "Task is Required" }),
  });

export const TodoContainer = () => {
  const { data, refetch } = useGetAllTodosQuery("");

  const [updateTodoMutation, { isLoading: loadingUpdate }] =
    useUpdateTodoMutation();
  const [createTodo, { isLoading: loadingCreate }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const updateState = useAppSelector((state) => state.todo.isUpdateActive);
  const id = useAppSelector((state) => state.todo.idToUpdate);

  const { handleSubmit, control, reset, setValue } = useForm<Todo>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data?.length) {
      dispatch(addTodos(data || []));
    }
  }, [data, dispatch]);

  const handleCreateTodo = async (data: Partial<Todo>) => {
    try {
      await createTodo({ ...data, status: "todo" });
    } catch (error) {
      reset();
      setOpenModal(!openModal);
    } finally {
      refetch();
      reset();
      setOpenModal(!openModal);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  const handleUpdate = async (data: Todo) => {
    try {
      await updateTodoMutation({ ...data, id: id || 0 });
    } catch (error) {
      reset();
      isUpdateActive({ isActive: false, id: 0 });
      setOpenModal(!openModal);
    } finally {
      refetch();
      reset();
      isUpdateActive({ isActive: false, id: 0 });
      setOpenModal(!openModal);
    }
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch(isUpdateActive({ isActive: true, id: todo.id }));

    setValue("task", todo.task);

    setOpenModal(!openModal);
  };

  const handleClose = () => {
    dispatch(isUpdateActive({ isActive: false, id: 0 }));
    reset();
    setOpenModal(!openModal);
  };

  return (
      <div className="flex flex-col">
        <Button
          type="primary"
          className="mb-3 w-64 self-end"
          onClick={() => setOpenModal(!openModal)}
        >
          Add Todo
        </Button>

        <Modal
          title={updateState ? "Update State" : "Add Todo"}
          open={openModal}
          closable={true}
          okText={updateState ? "Update" : "Add"}
          onOk={handleSubmit((d) =>
            updateState ? handleUpdate({ ...d }) : handleCreateTodo(d)
          )}
          onCancel={handleClose}
          centered={true}
        >
          <Controller
            control={control}
            name="task"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your Task"
                disabled={loadingCreate || loadingUpdate}
              />
            )}
          />
        </Modal>
        <List
          size="large"
          bordered
          dataSource={data || []}
          renderItem={(item) => (
            <List.Item className="flex justify-between">
              <div>{item.task}</div>
              <div>
                <Badge
                  status="processing"
                  text={item.status}
                  className="capitalize"
                />
                <EditTwoTone
                  className="ml-3 text-lg"
                  onClick={() => handleUpdateTodo(item)}
                />
                <DeleteTwoTone
                  className="ml-3 text-lg"
                  twoToneColor="red"
                  onClick={() => handleDeleteTodo(item.id)}
                />
              </div>
            </List.Item>
          )}
        />
      </div>
  );
};
