import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'src/components/layouts';
import { useForm } from 'react-hook-form';
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
  const { data: rs } = await axios.post<string, { data: Todo }>(
    'http://localhost:3000/api/todos',
    data
  );

  return rs;
};

export default function Home(): React.ReactElement {
  // Queries
  const query = useQuery('todos', getToDos);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const mutation = useMutation(postTodo, {
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries('todos');
    }
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
    reset({
      name: ''
    });
  };

  const toDos = query.data || [];
  return (
    <MainLayout home>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="flex-col w-screen flex items-center font-sans">
        <div className="bg-gray-600 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg md:max-w-2xl">
          <h1 className="text-white">Todo List</h1>
          <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="border border-gray-800 focus:border-blue-500 rounded w-full py-2 px-3 mr-4 text-black"
                type="text"
                {...register('name')}
                id="name_ip"
                placeholder="Add something to do"
              />
            </form>
          </div>
        </div>
        <div className="w-full bg-gray-800 flex items-center justify-center font-sans md:max-w-2xl">
          <div className="bg-gray-600 shadow m-1 w-full lg:w-3/4 lg:max-w-lg">
            <div id="to-do-list" className="m-1">
              {toDos.map((todo) => (
                <div key={todo.id} className="flex m-1 text-white">
                  <Link href={`/to-do/${todo.id}`}>{todo.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
