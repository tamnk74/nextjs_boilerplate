import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'src/components/layouts';
import { useForm, Controller } from 'react-hook-form';
import { Todo } from 'src/models';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getToDos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<string, { data: Todo[] }>(
    'http://localhost:3000/api/todos?limit=10&page=1'
  );

  return data;
};

const postTodo = async (data: Todo): Promise<Todo> => {
  const { data: rs } = await axios.post<string, { data: Todo }>('http://localhost:3000/api/todos', data);

  return rs;
};

export default function ToDoList(): React.ReactElement {
  // Queries
  const query = useQuery('todos', getToDos);
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm();
  const mutation = useMutation(postTodo, {
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries('todos');
    }
  });
  const onSubmit = (data: Todo) => {
    mutation.mutate(data);
    reset({
      name: ''
    });
  };

  const toDos = query.data ?? [];
  return (
    <MainLayout>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="container">
        <div className="justify-content-md-center">
          <h2>To do list </h2>
        </div>
        <div className="justify-content-md-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input {...field} type="text" id="name_ip" placeholder="something to do" />
              )}
            />
          </form>
        </div>
        <div className="justify-content-md-center">
          <div id="to-do-list">
            {toDos.map((todo) => (
              <div key={todo.id}>
                <Link href={`/to-do/${todo.id}`}>{todo.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
