import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'components/layouts';
import { useForm, Controller } from 'react-hook-form';
import { ListGroup, Row, Form } from 'react-bootstrap';
import { Todo } from 'models';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getToDos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<{ data: Todo[] }>(
    'http://localhost:3000/api/todos?limit=10&page=1'
  );

  return data;
};

const postTodo = async (data: Todo): Promise<Todo[]> => {
  const { result } = await axios.post<{ data: Todo }>('http://localhost:3000/api/todos', data);

  return result;
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
  const onSubmit = (data) => {
    mutation.mutate(data);
    reset({
      name: ''
    });
  };

  const toDos = query.data || [];
  return (
    <MainLayout>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="container">
        <Row className="justify-content-md-center">
          <h2>To do list </h2>
        </Row>
        <Row className="justify-content-md-center">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control {...field} type="text" id="name_ip" placeholder="something to do" />
              )}
            />
          </Form>
        </Row>
        <Row className="justify-content-md-center">
          <ListGroup id="to-do-list">
            {toDos.map((todo) => (
              <ListGroup.Item key={todo.id}>
                <Link href={`/to-do/${todo.id}`}>{todo.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      </div>
    </MainLayout>
  );
}
